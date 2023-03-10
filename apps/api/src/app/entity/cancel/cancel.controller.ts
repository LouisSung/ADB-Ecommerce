import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { CancelEntity } from './cancel.entity';
import { CancelService } from './cancel.service';
import { ApiPaginatedResponse } from '../../decorator/swagger.decorator';


@ApiTags('cancel')
@Controller('cancel')
export class CancelController {
  constructor(private readonly cancelService: CancelService) {
  }

  @ApiPaginatedResponse(CancelEntity)
  @Get('')
  async paginateCancels(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.cancelService.paginateCancels({ page, limit });
  }

  @Get(':rg_id')
  async findCancelByRgId(@Param('rg_id', ParseIntPipe) rg_id: CancelEntity['rg_id']) {
    const cancel = await this.cancelService.findCancelByRgId(rg_id);
    if (!cancel) {
      throw new NotFoundException(`cancel.rg_id = ${ rg_id } not found`);
    }
    return cancel;
  }

  @Get(':rg_id/orders')
  async getOrdersByRgId(@Param('rg_id', ParseIntPipe) rg_id: CancelEntity['rg_id']) {
    const cancelWithOrders = await this.cancelService.getOrdersByRgId(rg_id);
    if (!cancelWithOrders) {
      throw new NotFoundException(`orders (cancel.rg_id = ${ rg_id }) not found`);
    }
    return cancelWithOrders;
  }
}
