import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

import { KeywordEntity } from './keyword.entity';


@Injectable()
export class KeywordService {
  constructor(@InjectRepository(KeywordEntity) private readonly keywordRepository: Repository<KeywordEntity>) {
  }

  async paginateKeywords(options: IPaginationOptions & { order_by: string }): Promise<Pagination<KeywordEntity>> {
    const queryBuilder = this.keywordRepository.createQueryBuilder('keyword').orderBy(options.order_by, 'DESC');
    return paginate<KeywordEntity>(queryBuilder, options);
  }

  async getKeywordsWithDateRange(options: { limit: number, start_date: string, end_date: string }): Promise<KeywordEntity> {
    const startDate = options.start_date.replace(/T[\d.:]+Z/u, '');
    const endDate = options.end_date.replace(/T[\d.:]+Z/u, '');
    // XXX: note that we limit the order to 1000, otherwise it takes too much time to query
    return this.keywordRepository.query(`
      SELECT keyword, SUM(product_order_count) as occurrence_order
      FROM (
      SELECT product_name, COUNT(rs_id) as product_order_count
      FROM product JOIN "order"
        ON product.product_id = "order".product_id
        WHERE product_name <> '' AND order_time > '${ startDate }' AND order_time < '${ endDate }'
        GROUP BY product.product_id
        LIMIT 1000
      ) AS order_product JOIN keyword
      ON product_name LIKE concat('%', keyword, '%')
      GROUP BY keyword
      ORDER BY occurrence_order
      LIMIT ${ options.limit }
    `);
  }
}
