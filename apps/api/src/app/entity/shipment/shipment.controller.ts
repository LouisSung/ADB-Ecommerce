import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { ShipmentEntity } from './shipment.entity';
import { ShipmentService } from './shipment.service';


@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {
  }

  @Get(':rm_id')
  async findShipmentByRmId(@Param('rm_id') rm_id: ShipmentEntity['rm_id']) {
    const shipment = await this.shipmentService.findShipmentByRmId(rm_id);
    if (!shipment) {
      throw new NotFoundException(`shipment.rm_id = '${ rm_id }' not found`);
    }
    return shipment;
  }
}
