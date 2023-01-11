import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplierEntity } from './supplier.entity';
import { SupplierService } from './supplier.service';


@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SupplierService]
})
export class SupplierModule {}
