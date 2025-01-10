import { Test, TestingModule } from '@nestjs/testing';
import { QueueTokenController } from './queue-token.controller';
import { QueueTokenService } from './queue-token.service';
import { BadRequestException } from '@nestjs/common';

describe('QueueTokenController', () => {
  let controller: QueueTokenController;
  let service: QueueTokenService;

  const mockQueueTokenService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueTokenController],
      providers: [
        {
          provide: QueueTokenService,
          useValue: mockQueueTokenService,
        },
      ],
    }).compile();

    controller = module.get<QueueTokenController>(QueueTokenController);
    service = module.get<QueueTokenService>(QueueTokenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateToken', () => {
    it('should throw BadRequestException if userId is not provided', async () => {
      await expect(
        controller.generateToken({ userId: undefined }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should call QueueTokenService.generateToken with correct userId', async () => {
      const mockToken = 'test-token';
      const mockQueueInfo = { position: 1, estimatedTime: 300 };
      mockQueueTokenService.generateToken.mockResolvedValue({
        token: mockToken,
        queueInfo: mockQueueInfo,
      });

      const result = await controller.generateToken({ userId: 1 });

      expect(service.generateToken).toHaveBeenCalledWith(1);
      expect(result).toEqual({ token: mockToken, queueInfo: mockQueueInfo });
    });
  });
});
