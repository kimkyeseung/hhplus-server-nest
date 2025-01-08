import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QueueService } from './queue.service';

@Injectable()
export class QueueScheduler {
  private readonly logger = new Logger(QueueScheduler.name);

  constructor(private readonly queueService: QueueService) {}

  @Cron('*/30 * * * * *')
  async handleExpiredQueues() {
    this.logger.log('Processing expired queues...');
    try {
      await this.queueService.processExpiredQueues();
      this.logger.log('Expired queues processed successfully.');
    } catch (error) {
      this.logger.error('Error processing expired queues', error.stack);
    }
  }
}
