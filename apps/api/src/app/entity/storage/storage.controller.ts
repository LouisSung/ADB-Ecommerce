import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { StorageEntity } from './storage.entity';
import { StorageService } from './storage.service';


@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {
  }

  @Get('')
  async paginateStorages(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.storageService.paginateStorages({ page, limit });
  }

  @Get(':sl_id')
  async findStorageBySlId(@Param('sl_id') sl_id: StorageEntity['sl_id']) {
    const storage = await this.storageService.findStorageBySlId(sl_id);
    if (!storage) {
      throw new NotFoundException(`storage.sl_id = '${ sl_id }' not found`);
    }
    return storage;
  }
}
