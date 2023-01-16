import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { CancelService } from './cancel.service';


@ApiTags('cancel')
@Controller('neo4j/cancel')
export class CancelNeo4jController {
  constructor(private readonly cancelService: CancelService) {
  }

  @Get('')
  async neo4jCancel(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.cancelService.findAll({ limit }).run();
  }
}
