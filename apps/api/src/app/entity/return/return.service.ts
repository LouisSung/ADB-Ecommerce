import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ReturnEntity } from './return.entity';


@Injectable()
export class ReturnService {
  constructor(@InjectRepository(ReturnEntity) private readonly returnRepository: Repository<ReturnEntity>) {
  }

  async paginateReturns(options: IPaginationOptions): Promise<Pagination<ReturnEntity>> {
    const queryBuilder = this.returnRepository.createQueryBuilder('return').orderBy('return.return_id');
    return paginate<ReturnEntity>(queryBuilder, options);
  }

  async findReturnByReturnId(return_id: ReturnEntity['return_id']): Promise<ReturnEntity> {
    return this.returnRepository.findOneBy({ return_id });
  }
}
