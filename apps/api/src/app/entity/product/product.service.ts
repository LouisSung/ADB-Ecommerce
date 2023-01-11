import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ProductEntity } from './product.entity';


@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {
  }

  async paginateProducts(options: IPaginationOptions): Promise<Pagination<ProductEntity>> {
    const queryBuilder = this.productRepository.createQueryBuilder('product').orderBy('product.product_id');
    return paginate<ProductEntity>(queryBuilder, options);
  }

  async findProductByProductId(product_id: ProductEntity['product_id']): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ product_id });
  }
}
