import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from './entities/point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { redisConfig } from 'src/utils/redis.config';

@Injectable()
export class PointRepository extends Repository<Point> {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(Point)
    repository: Repository<Point>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
    this.redisClient = new Redis(redisConfig);
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    return this.redisClient.set(key, value);
  }
}
