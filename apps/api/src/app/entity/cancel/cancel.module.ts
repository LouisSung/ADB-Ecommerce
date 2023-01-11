import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CancelEntity } from './cancel.entity';
import { CancelService } from './cancel.service';


@Module({
  imports: [TypeOrmModule.forFeature([CancelEntity])],
  providers: [CancelService]
})
export class CancelModule {}
