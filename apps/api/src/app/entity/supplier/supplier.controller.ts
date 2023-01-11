import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { SupplierEntity } from './supplier.entity';
import { SupplierService } from './supplier.service';


@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {
  }

  @Get(':supplier_id')
  async findSupplierBySupplierId(@Param('supplier_id', ParseIntPipe) supplier_id: SupplierEntity['supplier_id']) {
    const supplier = await this.supplierService.findSupplierBySupplierId(supplier_id);
    if (!supplier) {
      throw new NotFoundException(`supplier.supplier_id = ${ supplier_id } not found`);
    }
    return supplier;
  }
}
