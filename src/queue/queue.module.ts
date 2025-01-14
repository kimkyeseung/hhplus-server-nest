import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from './entities/queue.entity';
import { QueueRepository } from './queue.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  providers: [QueueService, QueueRepository],
  exports: [QueueService, QueueRepository],
})
export class QueueModule {}
