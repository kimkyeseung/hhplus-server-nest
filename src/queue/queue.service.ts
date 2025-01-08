import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue, QueueStatus } from './entities/queue.entity';
import { Repository, LessThan } from 'typeorm';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  private readonly processingRate = 2; // 초당 처리 가능한 사용자 수
  private readonly averageProcessingTime = 30; // 사용자당 처리 시간 (초)

  async addToQueue(userId: number): Promise<Queue> {
    const newQueueItem = this.queueRepository.create({
      userId,
      status: QueueStatus.WAIT,
    });

    return this.queueRepository.save(newQueueItem);
  }

  async activateQueue(batchSize: number): Promise<Queue[]> {
    const tasksToActivate = await this.queueRepository.find({
      where: { status: QueueStatus.WAIT },
      order: { createdAt: 'ASC' },
      take: batchSize,
    });

    for (const task of tasksToActivate) {
      task.status = QueueStatus.ACTIVE;
      await this.queueRepository.save(task);
    }

    return tasksToActivate;
  }

  async processExpiredQueues(): Promise<void> {
    const now = new Date();
    const expiredQueues = await this.queueRepository.find({
      where: { expiresAt: LessThan(now), status: QueueStatus.ACTIVE },
    });

    const expiredCount = expiredQueues.length;

    if (expiredCount > 0) {
      await this.queueRepository.remove(expiredQueues);

      const waitingQueues = await this.queueRepository.find({
        where: { status: QueueStatus.WAIT },
        order: { createdAt: 'ASC' },
        take: expiredCount,
      });

      for (const queue of waitingQueues) {
        queue.status = QueueStatus.ACTIVE;
        queue.expiresAt = new Date(new Date().getTime() + 5 * 60 * 1000);
      }

      await this.queueRepository.save(waitingQueues);
    }
  }

  async getUserQueueStatus(userId: number): Promise<{
    status: QueueStatus;
    estimatedTime: number | null;
    numberOfUsersAhead: number | null;
  }> {
    const queue = await this.queueRepository.findOne({
      where: { userId },
    });

    if (!queue) {
      throw new Error('User not found in the queue');
    }

    if (queue.status === QueueStatus.ACTIVE) {
      return {
        status: QueueStatus.ACTIVE,
        estimatedTime: null,
        numberOfUsersAhead: null,
      };
    }

    const allQueues = await this.queueRepository.find({
      where: { status: QueueStatus.WAIT },
      order: { createdAt: 'ASC' },
    });

    const userIndex = allQueues.findIndex((q) => q.userId === userId);

    if (userIndex === -1) {
      throw new Error('User not found in the WAIT queue');
    }

    const numberOfUsersAhead = userIndex;

    const estimatedTime = this.calculateEstimatedTime(
      numberOfUsersAhead,
      this.processingRate,
      this.averageProcessingTime,
    );

    return {
      status: QueueStatus.WAIT,
      estimatedTime: Math.ceil(estimatedTime),
      numberOfUsersAhead,
    };
  }

  // 대기열의 예상시간 및 대기자 수 계산
  private calculateEstimatedTime(
    numberOfUsersAhead: number,
    processingRate: number,
    averageProcessingTime: number,
  ): number {
    return Math.ceil(
      (numberOfUsersAhead / processingRate) * averageProcessingTime,
    );
  }

  async getQueue(userId: number): Promise<Queue> | null {
    return await this.queueRepository.findOneBy({
      userId,
    });
  }
}
