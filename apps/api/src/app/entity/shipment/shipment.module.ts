import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShipmentService } from './shipment.service';
import { ShipmentEntity } from './shipment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ShipmentEntity])],
  providers: [ShipmentService]
})
export class ShipmentModule {}
