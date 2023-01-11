import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReturnEntity } from './return.entity';


@Injectable()
export class ReturnService {
  constructor(@InjectRepository(ReturnEntity) private readonly returnRepository: Repository<ReturnEntity>) {
  }

  async findReturnByReturnId(return_id: ReturnEntity['return_id']): Promise<ReturnEntity> {
    return this.returnRepository.findOneBy({ return_id });
  }
}
