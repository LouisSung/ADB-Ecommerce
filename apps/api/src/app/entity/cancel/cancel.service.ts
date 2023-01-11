import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CancelEntity } from './cancel.entity';


@Injectable()
export class CancelService {
  constructor(@InjectRepository(CancelEntity) private readonly cancelRepository: Repository<CancelEntity>) {
  }

  async findCancelByRgId(rg_id: CancelEntity['rg_id']): Promise<CancelEntity> {
    return this.cancelRepository.findOneBy({ rg_id });
  }
}
