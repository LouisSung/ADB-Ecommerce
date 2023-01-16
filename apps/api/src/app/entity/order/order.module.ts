import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { OrderNeo4jController } from './order.neo4j.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController, OrderNeo4jController],
  providers: [OrderService]
})
export class OrderModule {}
