import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShipmentController } from './shipment.controller';
import { ShipmentService } from './shipment.service';
import { ShipmentEntity } from './shipment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ShipmentEntity])],
  controllers: [ShipmentController],
  providers: [ShipmentService]
})
export class ShipmentModule {}
