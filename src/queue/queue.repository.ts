import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Queue } from './entities/queue.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QueueRepository extends Repository<Queue> {
  constructor(
    @InjectRepository(Queue)
    repository: Repository<Queue>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
