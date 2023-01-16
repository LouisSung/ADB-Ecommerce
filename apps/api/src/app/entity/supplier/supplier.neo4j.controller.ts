import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { SupplierService } from './supplier.service';


@ApiTags('supplier')
@Controller('neo4j/supplier')
export class SupplierNeo4jController {
  constructor(private readonly supplierService: SupplierService) {
  }

  @Get('')
  async neo4jOrder(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.supplierService.findAll({ limit }).run();
  }
}
