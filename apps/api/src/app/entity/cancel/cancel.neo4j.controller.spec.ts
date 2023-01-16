import { Test, TestingModule } from '@nestjs/testing';
import { CancelNeo4jController } from './cancel.neo4j.controller';

describe('CancelNeo4jController', () => {
  let controller: CancelNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelNeo4jController],
    }).compile();

    controller = module.get<CancelNeo4jController>(CancelNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
