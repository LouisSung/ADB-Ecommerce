import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StorageController } from './storage.controller';
import { StorageNeo4jController } from './storage.neo4j.controller';
import { StorageEntity } from './storage.entity';
import { StorageService } from './storage.service';


@Module({
  imports: [TypeOrmModule.forFeature([StorageEntity])],
  controllers: [StorageController, StorageNeo4jController],
  providers: [StorageService]
})
export class StorageModule {}
