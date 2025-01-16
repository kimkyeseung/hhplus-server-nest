import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PointHistory } from './entities/point-history.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PointHistoryRepository extends Repository<PointHistory> {
  constructor(
    @InjectRepository(PointHistory)
    repository: Repository<PointHistory>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
