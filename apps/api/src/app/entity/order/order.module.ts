import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService]
})
export class OrderModule {}
