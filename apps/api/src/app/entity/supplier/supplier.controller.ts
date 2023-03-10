import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { SupplierEntity } from './supplier.entity';
import { SupplierService } from './supplier.service';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {
  }

  @Get('')
  async paginateSuppliers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.supplierService.paginateSuppliers({ page, limit });
  }

  @Get(':supplier_id')
  async findSupplierBySupplierId(@Param('supplier_id', ParseIntPipe) supplier_id: SupplierEntity['supplier_id']) {
    const supplier = await this.supplierService.findSupplierBySupplierId(supplier_id);
    if (!supplier) {
      throw new NotFoundException(`supplier.supplier_id = ${ supplier_id } not found`);
    }
    return supplier;
  }

  @Get(':supplier_id/products')
  async getProductsBySupplierId(@Param('supplier_id', ParseIntPipe) supplier_id: SupplierEntity['supplier_id']) {
    const supplierWithProducts = await this.supplierService.getProductsBySupplierId(supplier_id);
    if (!supplierWithProducts) {
      throw new NotFoundException(`products (supplier.supplier_id = ${ supplier_id }) not found`);
    }
    return supplierWithProducts;
  }
}
