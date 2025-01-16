import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Queue, QueueStatus } from './entities/queue.entity';
import { Repository } from 'typeorm';

describe('QueueService', () => {
  let service: QueueService;
  let repository: Repository<Queue>;
  const mockRepository = {
    create: jest.fn().mockImplementation((data) => data),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: getRepositoryToken(Queue),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
    repository = module.get<Repository<Queue>>(getRepositoryToken(Queue));
  });

  it('should add user to queue', async () => {
    const userId = 1;
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue({
      id: 1,
      user: userId,
      status: QueueStatus.WAIT,
    } as Queue);

    const result = await service.addToQueue(userId);
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ user: userId }),
    );
    expect(result.status).toBe(QueueStatus.WAIT);
  });

  it('should activate queue', async () => {
    jest
      .spyOn(repository, 'find')
      .mockResolvedValue([
        { id: 1, status: QueueStatus.WAIT, createdAt: new Date() } as Queue,
      ]);
    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue({} as Queue);

    const result = await service.activateQueue(1);
    expect(saveSpy).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe(QueueStatus.ACTIVE);
  });

  it('should get user queue status', async () => {
    const userId = 1;

    // Mock findOne to return the user's queue item
    mockRepository.findOne.mockResolvedValue({
      id: 1,
      user: userId,
      status: QueueStatus.WAIT,
      createdAt: new Date(),
    } as Queue);

    // Mock find to return a list of all WAIT queues
    mockRepository.find.mockResolvedValue([
      {
        id: 1,
        user: userId,
        status: QueueStatus.WAIT,
        createdAt: new Date(),
      } as Queue,
      {
        id: 2,
        user: 2,
        status: QueueStatus.WAIT,
        createdAt: new Date(),
      } as Queue,
    ]);

    const result = await service.getUserQueueStatus(userId);

    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { status: QueueStatus.WAIT },
      order: { createdAt: 'ASC' },
    });

    expect(result.status).toBe(QueueStatus.WAIT);
    expect(result.estimatedTime).not.toBeNull();
  });
});
