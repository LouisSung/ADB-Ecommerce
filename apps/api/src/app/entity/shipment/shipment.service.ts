import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ShipmentEntity } from './shipment.entity';


@Injectable()
export class ShipmentService {
  constructor(@InjectRepository(ShipmentEntity) private readonly shipmentRepository: Repository<ShipmentEntity>) {
  }

  async paginateShipments(options: IPaginationOptions): Promise<Pagination<ShipmentEntity>> {
    const queryBuilder = this.shipmentRepository.createQueryBuilder('shipment').orderBy('shipment.rm_id');
    return paginate<ShipmentEntity>(queryBuilder, options);
  }

  async findShipmentByRmId(rm_id: ShipmentEntity['rm_id']): Promise<ShipmentEntity> {
    return this.shipmentRepository.findOneBy({ rm_id });
  }
}
