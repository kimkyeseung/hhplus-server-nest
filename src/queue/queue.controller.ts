import { Controller, Get, Param } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class OrdersController {
  constructor(private readonly queueService: QueueService) {}

  @Get(':userId/status')
  async getQueueStatus(@Param('userId') userId: number) {
    return await this.queueService.getUserQueueStatus(userId);
  }
}
