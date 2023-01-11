import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { CancelEntity } from './cancel.entity';
import { CancelService } from './cancel.service';


@Controller('cancel')
export class CancelController {
  constructor(private readonly cancelService: CancelService) {
  }

  @Get(':rg_id')
  async findCancelByRgId(@Param('rg_id', ParseIntPipe) rg_id: CancelEntity['rg_id']) {
    const cancel = await this.cancelService.findCancelByRgId(rg_id);
    if (!cancel) {
      throw new NotFoundException(`cancel.rg_id = ${ rg_id } not found`);
    }
    return cancel;
  }
}
