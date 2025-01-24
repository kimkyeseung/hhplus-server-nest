import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from '../../src/utils/redis.config';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(redisConfig);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<string> {
    if (ttl) {
      return this.redisClient.set(key, value, 'EX', ttl);
    }
    return this.redisClient.set(key, value);
  }
}
