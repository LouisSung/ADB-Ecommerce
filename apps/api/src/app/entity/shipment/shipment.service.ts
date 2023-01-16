import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ShipmentEntity } from './shipment.entity';


@Injectable()
export class ShipmentService extends Neo4jNodeModelService<ShipmentEntity> {
  constructor(@InjectRepository(ShipmentEntity) private readonly shipmentRepository: Repository<ShipmentEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Shipment';
  protected logger = undefined;
  protected timestamp = undefined;

  async paginateShipments(options: IPaginationOptions): Promise<Pagination<ShipmentEntity>> {
    const queryBuilder = this.shipmentRepository.createQueryBuilder('shipment').orderBy('shipment.rm_id');
    return paginate<ShipmentEntity>(queryBuilder, options);
  }

  async findShipmentByRmId(rm_id: ShipmentEntity['rm_id']): Promise<ShipmentEntity> {
    return this.shipmentRepository.findOneBy({ rm_id });
  }

  async getOrdersByRmId(rm_id: ShipmentEntity['rm_id']): Promise<ShipmentEntity> {
    return this.shipmentRepository.findOne({ relations: ['orders'], where: { rm_id } });
  }
}
