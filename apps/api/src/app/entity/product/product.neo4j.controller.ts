import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ProductService } from './product.service';


@ApiTags('product')
@Controller('neo4j/product')
export class ProductNeo4jController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('')
  async neo4jProduct(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.productService.findAll({ limit }).run();
  }
}
