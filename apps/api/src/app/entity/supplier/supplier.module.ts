import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplierController } from './supplier.controller';
import { SupplierNeo4jController } from './supplier.neo4j.controller';
import { SupplierEntity } from './supplier.entity';
import { SupplierService } from './supplier.service';


@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  controllers: [SupplierController, SupplierNeo4jController],
  providers: [SupplierService]
})
export class SupplierModule {}
