import { Test, TestingModule } from '@nestjs/testing';
import { PointHistoryService } from './point-history.service';

describe('PointHistoryService', () => {
  let service: PointHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointHistoryService],
    }).compile();

    service = module.get<PointHistoryService>(PointHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
