import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Queue } from '../queue/entities/queue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QueueTokenService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  async generateToken(
    userId: number,
  ): Promise<{ token: string; queueInfo: any }> {
    const token = uuidv4();

    const queue = await this.queueRepository.findOne({
      where: { user: userId },
    });

    if (!queue) {
      throw new Error('User is not in the queue');
    }

    const queueInfo = {
      position: await this.getQueuePosition(queue.id),
      estimatedTime: this.calculateEstimatedTime(queue.createdAt),
    };

    return { token, queueInfo };
  }

  private async getQueuePosition(queueId: number): Promise<number> {
    const allQueues = await this.queueRepository.find({
      order: { createdAt: 'ASC' },
    });

    const position = allQueues.findIndex((q) => q.id === queueId);
    return position + 1;
  }

  private calculateEstimatedTime(createdAt: Date): number {
    const elapsedTime = (Date.now() - createdAt.getTime()) / 1000; // seconds
    return Math.max(0, 300 - elapsedTime); // 5 minutes - elapsed
  }
}
