import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { StorageService } from './storage.service';


@ApiTags('storage')
@Controller('neo4j/storage')
export class StorageNeo4jController {
  constructor(private readonly storageService: StorageService) {
  }

  @Get('')
  async neo4jOrder(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.storageService.findAll({ limit }).run();
  }
}
