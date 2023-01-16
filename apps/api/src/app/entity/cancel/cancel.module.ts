import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neo4jModule } from '@nhogs/nestjs-neo4j';

import { CancelController } from './cancel.controller';
import { CancelNeo4jController } from './cancel.neo4j.controller';
import { CancelEntity } from './cancel.entity';
import { CancelService } from './cancel.service';


@Module({
  imports: [Neo4jModule, TypeOrmModule.forFeature([CancelEntity])],
  controllers: [CancelController, CancelNeo4jController],
  providers: [CancelService],
})
export class CancelModule {}
