import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Point } from './entities/point.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(
    @InjectRepository(Point)
    repository: Repository<Point>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
