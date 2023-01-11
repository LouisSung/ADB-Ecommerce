import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageController } from './storage.controller';
import { StorageEntity } from './storage.entity';
import { StorageService } from './storage.service';


@Module({
  imports: [TypeOrmModule.forFeature([StorageEntity])],
  controllers: [StorageController],
  providers: [StorageService]
})
export class StorageModule {}
