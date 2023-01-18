import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { KeywordEntity } from './keyword.entity';


@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
