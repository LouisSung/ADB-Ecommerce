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
}
