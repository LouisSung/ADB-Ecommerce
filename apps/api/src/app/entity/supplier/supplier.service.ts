import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierEntity } from './supplier.entity';


@Injectable()
export class SupplierService {
  constructor(@InjectRepository(SupplierEntity) private readonly supplierRepository: Repository<SupplierEntity>) {
  }

  async findSupplierBySupplierId(supplier_id: SupplierEntity['supplier_id']): Promise<SupplierEntity> {
    return this.supplierRepository.findOneBy({ supplier_id });
  }
}
