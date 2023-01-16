import { Test, TestingModule } from '@nestjs/testing';
import { SupplierNeo4jController } from './supplier.neo4j.controller';

describe('SupplierNeo4jController', () => {
  let controller: SupplierNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierNeo4jController],
    }).compile();

    controller = module.get<SupplierNeo4jController>(SupplierNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
