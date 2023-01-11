import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';


@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {
  }

  async paginateOrders(options: IPaginationOptions): Promise<Pagination<OrderEntity>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order').orderBy('order.rs_id');
    return paginate<OrderEntity>(queryBuilder, options);
  }

  async findOrderByRsId(rs_id: OrderEntity['rs_id']): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ rs_id });
  }
}
