import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { SupplierEntity } from './supplier.entity';


@Injectable()
export class SupplierService extends Neo4jNodeModelService<SupplierEntity>{
  constructor(@InjectRepository(SupplierEntity) private readonly supplierRepository: Repository<SupplierEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Supplier';
  protected logger = undefined;
  protected timestamp = undefined;

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
