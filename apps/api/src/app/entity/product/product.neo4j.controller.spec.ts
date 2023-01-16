import { Test, TestingModule } from '@nestjs/testing';
import { ProductNeo4jController } from './product.neo4j.controller';

describe('ProductNeo4jController', () => {
  let controller: ProductNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductNeo4jController],
    }).compile();

    controller = module.get<ProductNeo4jController>(ProductNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
