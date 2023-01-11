import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { StorageEntity } from './storage.entity';


@Injectable()
export class StorageService {
  constructor(@InjectRepository(StorageEntity) private readonly storageRepository: Repository<StorageEntity>) {
  }

  async paginateStorages(options: IPaginationOptions): Promise<Pagination<StorageEntity>> {
    const queryBuilder = this.storageRepository.createQueryBuilder('storage').orderBy('storage.sl_id');
    return paginate<StorageEntity>(queryBuilder, options);
  }

  async findStorageBySlId(sl_id: StorageEntity['sl_id']): Promise<StorageEntity> {
    return this.storageRepository.findOneBy({ sl_id });
  }
}
