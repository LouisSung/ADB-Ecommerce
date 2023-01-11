import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get(':rs_id')
  async findOrderByRsId(@Param('rs_id') rs_id: OrderEntity['rs_id']) {
    const order = await this.orderService.findOrderByRsId(rs_id);
    if (!order) {
      throw new NotFoundException(`order.rs_id = '${ rs_id }' not found`);
    }
    return order;
  }
}
