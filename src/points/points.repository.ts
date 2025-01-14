import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Point } from './entities/point.entity';

@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(private readonly dataSource: DataSource) {
    super(Point, dataSource.createEntityManager());
  }
}
