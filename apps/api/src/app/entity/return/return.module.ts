import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReturnController } from './return.controller';
import { ReturnEntity } from './return.entity';
import { ReturnService } from './return.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReturnEntity])],
  controllers: [ReturnController],
  providers: [ReturnService]
})
export class ReturnModule {}
