import { Test, TestingModule } from '@nestjs/testing';
import { ReturnNeo4jController } from './return.neo4j.controller';

describe('ReturnNeo4jController', () => {
  let controller: ReturnNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnNeo4jController],
    }).compile();

    controller = module.get<ReturnNeo4jController>(ReturnNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
