import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KeywordDto } from '#libs/dto/entity/keyword.dto';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { KeywordService } from './keyword.service';
import { ApiPaginatedResponse } from '../../decorator/swagger.decorator';


@ApiTags('keyword')
@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {
  }
  @ApiPaginatedResponse(KeywordDto)
  @Get('')
  async paginateKeywords(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE,
    @Query('order_by', new DefaultValuePipe('keyword')) order_by = 'keyword' // FIXME: should adopt DTO
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.keywordService.paginateKeywords({ page, limit, order_by });
  }

  @Get('range')
  async getKeywordsWithDateRange(
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE,
    @Query('start_date') start_date: string,
    @Query('end_date') end_date: string
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return { items: await this.keywordService.getKeywordsWithDateRange({ limit, start_date, end_date}) };
  }
}
