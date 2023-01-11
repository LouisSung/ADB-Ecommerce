import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { StorageEntity } from './storage.entity';
import { StorageService } from './storage.service';


@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {
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
