import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Queue } from './entities/queue.entity';

@Injectable()
export class QueueRepository extends Repository<Queue> {
  constructor(private readonly dataSource: DataSource) {
    super(Queue, dataSource.createEntityManager());
  }
}
