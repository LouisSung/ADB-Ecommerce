import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReturnController } from './return.controller';
import { ReturnNeo4jController } from './return.neo4j.controller';
import { ReturnEntity } from './return.entity';
import { ReturnService } from './return.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReturnEntity])],
  controllers: [ReturnController, ReturnNeo4jController],
  providers: [ReturnService]
})
export class ReturnModule {}
