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

  @Get(':product_id/orders')
  async getOrdersByProductId(@Param('product_id', ParseIntPipe) product_id: ProductEntity['product_id']) {
    const productWithOrders = await this.productService.getOrdersByProductId(product_id);
    if (!productWithOrders) {
      throw new NotFoundException(`orders (product.product_id = ${ product_id }) not found`);
    }
    return productWithOrders;
  }

  @Get(':product_id/storages')
  async getStoragesByProductId(@Param('product_id', ParseIntPipe) product_id: ProductEntity['product_id']) {
    const productWithStorages = await this.productService.getStoragesByProductId(product_id);
    if (!productWithStorages) {
      throw new NotFoundException(`storages (product.product_id = ${ product_id }) not found`);
    }
    return productWithStorages;
  }
}
