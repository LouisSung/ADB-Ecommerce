import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get('')
  async paginateOrders(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.orderService.paginateOrders({ page, limit });
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
