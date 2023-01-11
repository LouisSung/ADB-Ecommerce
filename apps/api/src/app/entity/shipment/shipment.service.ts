import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShipmentEntity } from './shipment.entity';


@Injectable()
export class ShipmentService {
  constructor(@InjectRepository(ShipmentEntity) private readonly shipmentRepository: Repository<ShipmentEntity>) {
  }

  async findShipmentByRmId(rm_id: ShipmentEntity['rm_id']): Promise<ShipmentEntity> {
    return this.shipmentRepository.findOneBy({ rm_id });
  }
}
