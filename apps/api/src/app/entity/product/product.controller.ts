import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../../constant';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('')
  async paginateProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(DEFAULT_PAGE_SIZE), ParseIntPipe) limit = DEFAULT_PAGE_SIZE
  ) {
    limit = Math.max(1, Math.min(limit, MAX_PAGE_SIZE));
    return await this.productService.paginateProducts({ page, limit });
  }

  @Get(':product_id')
  async findProductByProductId(@Param('product_id', ParseIntPipe) product_id: ProductEntity['product_id']) {
    const product = await this.productService.findProductByProductId(product_id);
    if (!product) {
      throw new NotFoundException(`product.product_id = ${ product_id } not found`);
    }
    return product;
  }
}
