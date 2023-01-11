import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StorageEntity } from './storage.entity';


@Injectable()
export class StorageService {
  constructor(@InjectRepository(StorageEntity) private readonly storageRepository: Repository<StorageEntity>) {
  }

  async findStorageBySlId(sl_id: StorageEntity['sl_id']): Promise<StorageEntity> {
    return this.storageRepository.findOneBy({ sl_id });
  }
}
