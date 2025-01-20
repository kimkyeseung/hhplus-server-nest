import { Test, TestingModule } from '@nestjs/testing';
import { PointsService } from './points.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import {
  PointHistory,
  PointHistoryType,
} from './entities/point-history.entity';

describe('PointsService', () => {
  let service: PointsService;

  const mockPointRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockPointHistoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointsService,
        {
          provide: getRepositoryToken(Point),
          useValue: mockPointRepository,
        },
        {
          provide: getRepositoryToken(PointHistory),
          useValue: mockPointHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<PointsService>(PointsService);
  });

  it('should charge points', async () => {
    const userId = 1;
    const chargeAmount = 100;

    mockPointRepository.findOne.mockResolvedValue({
      id: 1,
      balance: 200,
      user: { id: userId },
    } as Point);

    mockPointRepository.save.mockResolvedValue({
      id: 1,
      balance: 300,
      user: { id: userId },
    } as Point);

    mockPointHistoryRepository.create.mockReturnValue({
      user: { id: userId },
      balance: 300,
      type: PointHistoryType.CHARGE,
    } as PointHistory);

    mockPointHistoryRepository.save.mockResolvedValue({
      id: 1,
      user: { id: userId },
      balance: 300,
      type: PointHistoryType.CHARGE,
      createdAt: new Date(),
    } as PointHistory);

    const result = await service.chargePoints(userId, chargeAmount);

    expect(mockPointRepository.findOne).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });
    expect(mockPointRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ balance: 300 }),
    );
    expect(mockPointHistoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        balance: 300,
        type: PointHistoryType.CHARGE,
        user: { id: userId },
      }),
    );
    expect(mockPointHistoryRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        balance: 300,
        type: PointHistoryType.CHARGE,
      }),
    );
    expect(result.balance).toBe(300);
  });
});
