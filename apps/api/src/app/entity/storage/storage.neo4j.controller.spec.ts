import { Test, TestingModule } from '@nestjs/testing';
import { StorageNeo4jController } from './storage.neo4j.controller';

describe('StorageNeo4jController', () => {
  let controller: StorageNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageNeo4jController],
    }).compile();

    controller = module.get<StorageNeo4jController>(StorageNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
