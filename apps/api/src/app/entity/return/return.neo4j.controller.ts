import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ReturnService } from './return.service';


@ApiTags('return')
@Controller('neo4j/return')
export class ReturnNeo4jController {
  constructor(private readonly returnService: ReturnService) {
  }

  @Get('')
  async neo4jOrder(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.returnService.findAll({ limit }).run();
  }
}
