import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';


@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {
  }

  async findOrderByRsId(rs_id: OrderEntity['rs_id']): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ rs_id });
  }
}
