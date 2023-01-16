import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neo4jNodeModelService, Neo4jService } from '@nhogs/nestjs-neo4j';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { ProductEntity } from './product.entity';


@Injectable()
export class ProductService extends Neo4jNodeModelService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>, public readonly neo4jService: Neo4jService) {
    super();
  }
  public readonly label = 'Product';
  protected logger = undefined;
  protected timestamp = undefined;

  async paginateProducts(options: IPaginationOptions): Promise<Pagination<ProductEntity>> {
    const queryBuilder = this.productRepository.createQueryBuilder('product').orderBy('product.product_id');
    return paginate<ProductEntity>(queryBuilder, options);
  }

  async findProductByProductId(product_id: ProductEntity['product_id']): Promise<ProductEntity> {
    return this.productRepository.findOneBy({ product_id });
  }

  async getOrdersByProductId(product_id: ProductEntity['product_id']): Promise<ProductEntity> {
    return this.productRepository.findOne({ relations: ['orders'], where: { product_id } });
  }

  async getStoragesByProductId(product_id: ProductEntity['product_id']): Promise<ProductEntity> {
    return this.productRepository.findOne({ relations: ['storages'], where: { product_id } });
  }
}
