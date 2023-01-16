import { Test, TestingModule } from '@nestjs/testing';
import { OrderNeo4jController } from './order.neo4j.controller';

describe('OrderNeo4jController', () => {
  let controller: OrderNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderNeo4jController],
    }).compile();

    controller = module.get<OrderNeo4jController>(OrderNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
