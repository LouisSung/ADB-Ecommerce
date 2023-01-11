import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CancelController } from './cancel.controller';
import { CancelEntity } from './cancel.entity';
import { CancelService } from './cancel.service';


@Module({
  imports: [TypeOrmModule.forFeature([CancelEntity])],
  controllers: [CancelController],
  providers: [CancelService]
})
export class CancelModule {}
