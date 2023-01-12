import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ReturnEntity } from './return.entity';
import { ReturnService } from './return.service';


@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {
  }

  @Get('')
  async paginateReturn(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.returnService.paginateReturns({ page, limit });
  }

  @Get(':return_id')
  async findReturnByReturnId(@Param('return_id') return_id: ReturnEntity['return_id']) {
    const return_ = await this.returnService.findReturnByReturnId(return_id);
    if (!return_) {
      throw new NotFoundException(`return.return_id = '${ return_id }' not found`);
    }
    return return_;
  }

  @Get(':return_id/orders') // FIXME
  async getOrdersByReturnId(@Param('return_id') return_id: ReturnEntity['return_id']) {
    const returnWithOrders = await this.returnService.getOrdersByReturnId(return_id);
    if (!returnWithOrders) {
      throw new NotFoundException(`orders (return.return_id = ${ return_id }) not found`);
    }
    return returnWithOrders;
  }
}
