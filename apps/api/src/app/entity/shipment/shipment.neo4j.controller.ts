import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ShipmentService } from './shipment.service';


@ApiTags('shipment')
@Controller('neo4j/shipment')
export class ShipmentNeo4jController {
  constructor(private readonly shipmentService: ShipmentService) {
  }

  @Get('')
  async neo4jOrder(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.shipmentService.findAll({ limit }).run();
  }
}
