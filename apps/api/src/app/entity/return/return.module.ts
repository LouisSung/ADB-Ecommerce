import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReturnEntity } from './return.entity';
import { ReturnService } from './return.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReturnEntity])],
  providers: [ReturnService]
})
export class ReturnModule {}
