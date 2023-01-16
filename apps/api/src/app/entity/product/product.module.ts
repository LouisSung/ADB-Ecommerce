import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductNeo4jController } from './product.neo4j.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController, ProductNeo4jController],
  providers: [ProductService]
})
export class ProductModule {}
