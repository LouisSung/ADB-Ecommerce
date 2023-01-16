import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { StorageEntity } from './storage.entity';


@Injectable()
export class StorageService extends Neo4jNodeModelService<StorageEntity> {
  constructor(@InjectRepository(StorageEntity) private readonly storageRepository: Repository<StorageEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Storage';
  protected logger = undefined;
  protected timestamp = undefined;

  async paginateStorages(options: IPaginationOptions): Promise<Pagination<StorageEntity>> {
    const queryBuilder = this.storageRepository.createQueryBuilder('storage').orderBy('storage.sl_id');
    return paginate<StorageEntity>(queryBuilder, options);
  }

  async findStorageBySlId(sl_id: StorageEntity['sl_id']): Promise<StorageEntity> {
    return this.storageRepository.findOneBy({ sl_id });
  }
}
