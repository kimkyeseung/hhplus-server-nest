import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { QueueService } from '../../src/queue/queue.service';
import { Queue, QueueStatus } from '../../src/queue/entities/queue.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly queueService: QueueService,
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  async updateQueueExpiration(queue: Queue): Promise<void> {
    const newExpiresAt = new Date(new Date().getTime() + 5 * 60 * 1000);
    queue.expiresAt = newExpiresAt;

    await this.queueRepository.save(queue);
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order | Queue> {
    const { userId } = createOrderDto;

    const queue = await this.queueService.getQueue(userId);

    if (!queue) {
      return await this.queueService.addToQueue(userId);
    }

    if (queue.status === QueueStatus.ACTIVE) {
      await this.updateQueueExpiration(queue);
      return await this.createOrder(createOrderDto);
    }

    return queue;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
