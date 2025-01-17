import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { QueueService } from '../../src/queue/queue.service';
import { Queue } from '../../src/queue/entities/queue.entity';
import { OrderRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Queue])],
  controllers: [OrdersController],
  providers: [OrdersService, QueueService, OrderRepository],
  exports: [OrdersService, OrderRepository],
})
export class OrdersModule {}
