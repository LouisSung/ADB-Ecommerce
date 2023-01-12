import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ShipmentEntity } from './shipment.entity';
import { ShipmentService } from './shipment.service';


@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {
  }

  @Get('')
  async paginateShipments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.shipmentService.paginateShipments({ page, limit });
  }

  @Get(':rm_id')
  async findShipmentByRmId(@Param('rm_id') rm_id: ShipmentEntity['rm_id']) {
    const shipment = await this.shipmentService.findShipmentByRmId(rm_id);
    if (!shipment) {
      throw new NotFoundException(`shipment.rm_id = '${ rm_id }' not found`);
    }
    return shipment;
  }

  @Get(':rm_id/orders')
  async getOrdersByRmId(@Param('rm_id') rm_id: ShipmentEntity['rm_id']) {
    const shipmentWithOrders = await this.shipmentService.getOrdersByRmId(rm_id);
    if (!shipmentWithOrders) {
      throw new NotFoundException(`orders (shipment.rm_id = ${ rm_id }) not found`);
    }
    return shipmentWithOrders;
  }
}
