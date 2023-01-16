import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentNeo4jController } from './shipment.neo4j.controller';

describe('ShipmentNeo4jController', () => {
  let controller: ShipmentNeo4jController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentNeo4jController],
    }).compile();

    controller = module.get<ShipmentNeo4jController>(ShipmentNeo4jController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
