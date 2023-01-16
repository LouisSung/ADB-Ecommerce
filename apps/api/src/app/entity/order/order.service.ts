import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';


@Injectable()
export class OrderService extends Neo4jNodeModelService<OrderEntity> {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Order';
  protected logger = undefined;
  protected timestamp = undefined;

  async paginateOrders(options: IPaginationOptions): Promise<Pagination<OrderEntity>> {
    const queryBuilder = this.orderRepository.createQueryBuilder('order').orderBy('order.rs_id');
    return paginate<OrderEntity>(queryBuilder, options);
  }

  async findOrderByRsId(rs_id: OrderEntity['rs_id']): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ rs_id });
  }
}
