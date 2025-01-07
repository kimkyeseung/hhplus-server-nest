import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue, QueueStatus } from './entities/queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

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
}
