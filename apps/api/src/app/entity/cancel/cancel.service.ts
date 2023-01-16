import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CancelEntity } from './cancel.entity';


@Injectable()
export class CancelService extends Neo4jNodeModelService<CancelService> {
  constructor(@InjectRepository(CancelEntity) private readonly cancelRepository: Repository<CancelEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Cancel';
  protected logger = undefined;
  protected timestamp = undefined;

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
