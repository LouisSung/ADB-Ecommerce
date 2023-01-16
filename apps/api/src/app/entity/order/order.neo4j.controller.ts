import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { OrderService } from './order.service';


@ApiTags('order')
@Controller('neo4j/order')
export class OrderNeo4jController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get('')
  async neo4jOrder(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.orderService.findAll({ limit }).run();
  }
}
