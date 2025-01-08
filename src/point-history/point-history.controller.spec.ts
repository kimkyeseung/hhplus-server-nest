import { Test, TestingModule } from '@nestjs/testing';
import { PointHistoryController } from './point-history.controller';
import { PointHistoryService } from './point-history.service';

describe('PointHistoryController', () => {
  let controller: PointHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointHistoryController],
      providers: [PointHistoryService],
    }).compile();

    controller = module.get<PointHistoryController>(PointHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
