import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CancelEntity } from './cancel.entity';


@Injectable()
export class CancelService {
  constructor(@InjectRepository(CancelEntity) private readonly cancelRepository: Repository<CancelEntity>) {
  }

  async paginateCancels(options: IPaginationOptions): Promise<Pagination<CancelEntity>> {
    const queryBuilder = this.cancelRepository.createQueryBuilder('cancel').orderBy('cancel.rg_id');
    return paginate<CancelEntity>(queryBuilder, options);
  }

  async findCancelByRgId(rg_id: CancelEntity['rg_id']): Promise<CancelEntity> {
    return this.cancelRepository.findOneBy({ rg_id });
  }

  async getOrdersByRgId(rg_id: CancelEntity['rg_id']): Promise<CancelEntity> {
    return this.cancelRepository.findOne({ relations: ['orders'], where: { rg_id } });
  }
}
