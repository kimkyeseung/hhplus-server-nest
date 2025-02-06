import { Controller, Get, Param, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get(':userId/status')
  async getQueueStatus(@Param('userId') userId: number) {
    return await this.queueService.getUserQueueStatus(userId);
  }

  @Post(':userId')
  async addToQueue(@Param('userId') userId: number) {
    await this.queueService.addToQueue(userId);
    return { message: 'User added to queue' };
  }
}
