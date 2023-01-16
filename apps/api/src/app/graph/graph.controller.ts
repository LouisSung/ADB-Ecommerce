import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constant';
import { ConfigService } from '@nestjs/config';


@ApiTags('neo4j')
@Controller('neo4j')
export class GraphController {
  constructor(private readonly configService: ConfigService) {
  }

  @Get('auth')
  getNeo4jAuth() {
    return {
      url: process.env.NEO4J_URL ?? this.configService.get('NEO4J_URL') ?? 'neo4j://localhost:7687',
      username: process.env.NEO4J_USERNAME ?? this.configService.get('NEO4J_USERNAME') ?? 'neo4j',
      password: process.env.NEO4J_PASSWORD ?? this.configService.get('NEO4j_PASSWORD') ?? ''
    };
  }

  @Get(['keyword', 'keyword/:keyword'])
  genKeywordQuery(
    @Param('keyword', new DefaultValuePipe('')) keyword = '',
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE,
    @Query('cancel', new DefaultValuePipe('')) cancel = '',
    @Query('order', new DefaultValuePipe('')) order = '',
    @Query('return', new DefaultValuePipe('')) return_ = '',
    @Query('shipment', new DefaultValuePipe('')) shipment = '',
    @Query('storage', new DefaultValuePipe('')) storage = '',
    @Query('supplier', new DefaultValuePipe('')) supplier = '',
    @Query('ORDER_BY', new DefaultValuePipe('order_count DESC')) ORDER_BY = 'order_count DESC',
  ) {
    keyword = keyword.replace(/['"]/ug, '');
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    // no order_count if order is not queried or no keyword (performance consideration)
    ORDER_BY = ORDER_BY === 'order_count DESC' && (!keyword || !order) ? '' : ORDER_BY;

    let cypher = keyword ? `CALL apoc.create.vNode(['Keyword'], {keyword: '${ keyword }'}) YIELD node AS keyword\n` : '';
    cypher += 'MATCH (product: Product)\n';
    cypher += keyword ? `WHERE product.product_name CONTAINS '${ keyword }'\n` : '';
    cypher += keyword ? `CALL apoc.create.vRelationship(keyword, 'IS_IN', {}, product) YIELD rel AS r0\n` : '';
    cypher += supplier ? 'OPTIONAL MATCH (product: Product)-[r1:IS_SUPPLIED_BY]->(supplier: Supplier)\n' : '';
    if (order) {
      cypher += 'OPTIONAL MATCH (order: Order)-[r2:CONTAINS]->(product: Product)\n';
      cypher += cancel ? 'OPTIONAL MATCH (order: Order)-[r3:IS_CANCELED_BY]->(cancel: Cancel)\n' : '';
      cypher += return_ ? 'OPTIONAL MATCH (order: Order)-[r4:IS_RETURNED_BY]->(return: Return)\n' : '';
      cypher += shipment ? 'OPTIONAL MATCH (order: Order)-[r5:IS_SHIPPED_BY]->(shipment: Shipment)\n' : '';
    }
    cypher += storage ? 'OPTIONAL MATCH (storage: Storage)-[r6:STORES]->(product: Product)\n' : '';
    cypher += `WITH *${ ORDER_BY.startsWith('order_count') ? ', COUNT(order) as order_count' : '' }\n`;
    const relations = cypher.match(/r\d/ug).sort((a, b) => a.localeCompare(b));
    const toReturns = [
      'product', order && 'order', supplier && 'supplier', order && cancel && 'cancel', order && return_ && 'return',
      order && shipment && 'shipment', storage && 'storage', keyword && 'keyword', ...relations
    ].filter((toReturn) => toReturn); // filter out `false`
    cypher += `RETURN ${ toReturns.join(', ') }\n`;
    cypher += ORDER_BY ? `ORDER BY ${ ORDER_BY }\n` : '';
    cypher += limit ? `LIMIT ${ limit }\n` : '';
    return { cypher: cypher };
  }
}
