import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from './product.entity';


@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {
  }

  async findProductByProductId(product_id: ProductEntity['product_id']): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ product_id });
  }
}
