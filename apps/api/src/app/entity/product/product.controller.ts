import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
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
