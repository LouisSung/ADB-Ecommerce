import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { ReturnEntity } from './return.entity';
import { ReturnService } from './return.service';


@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {
  }

  @Get(':return_id')
  async findReturnByReturnId(@Param('return_id') return_id: ReturnEntity['return_id']) {
    const return_ = await this.returnService.findReturnByReturnId(return_id);
    if (!return_) {
      throw new NotFoundException(`return.return_id = '${ return_id }' not found`);
    }
    return return_;
  }
}
