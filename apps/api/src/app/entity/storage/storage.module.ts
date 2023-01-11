import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageEntity } from './storage.entity';
import { StorageService } from './storage.service';


@Module({
  imports: [TypeOrmModule.forFeature([StorageEntity])],
  providers: [StorageService]
})
export class StorageModule {}
