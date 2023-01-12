import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { SupplierEntity } from './supplier.entity';


@Injectable()
export class SupplierService {
  constructor(@InjectRepository(SupplierEntity) private readonly supplierRepository: Repository<SupplierEntity>) {
  }

  async paginateSuppliers(options: IPaginationOptions): Promise<Pagination<SupplierEntity>> {
    const queryBuilder = this.supplierRepository.createQueryBuilder('supplier').orderBy('supplier.supplier_id');
    return paginate<SupplierEntity>(queryBuilder, options);
  }

  async findSupplierBySupplierId(supplier_id: SupplierEntity['supplier_id']): Promise<SupplierEntity> {
    return this.supplierRepository.findOneBy({ supplier_id });
  }

  async getProductsBySupplierId(supplier_id: SupplierEntity['supplier_id']): Promise<SupplierEntity> {
    return this.supplierRepository.findOne({ relations: ['products'], where: { supplier_id } });
  }
}
