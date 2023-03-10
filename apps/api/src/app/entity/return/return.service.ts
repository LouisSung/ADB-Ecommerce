import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ReturnEntity } from './return.entity';


@Injectable()
export class ReturnService extends Neo4jNodeModelService<ReturnEntity> {
  constructor(@InjectRepository(ReturnEntity) private readonly returnRepository: Repository<ReturnEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Return';
  protected logger = undefined;
  protected timestamp = undefined;

  async paginateReturns(options: IPaginationOptions): Promise<Pagination<ReturnEntity>> {
    const queryBuilder = this.returnRepository.createQueryBuilder('return').orderBy('return.return_id');
    return paginate<ReturnEntity>(queryBuilder, options);
  }

  async findReturnByReturnId(return_id: ReturnEntity['return_id']): Promise<ReturnEntity> {
    return this.returnRepository.findOneBy({ return_id });
  }

  async getOrdersByReturnId(return_id: ReturnEntity['return_id']): Promise<ReturnEntity> {
    return this.returnRepository.findOne({ relations: ['orders'], where: { return_id } });
  }
}
