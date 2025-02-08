import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { createClient } from 'redis';

@Injectable()
export class QueueScheduler {
  private readonly redisClient;
  private readonly queueName = 'user_queue';
  private readonly batchSize = 5;
  private readonly expirationTime = 60000;

  constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  @Cron('*/10 * * * * *')
  async autoActivateQueue() {
    await this.activateQueue();
  }

  @Cron('*/30 * * * * *')
  async autoRemoveExpiredUsers() {
    await this.removeExpiredUsers();
  }

  async activateQueue(): Promise<number[]> {
    const users = await this.redisClient.zRange(
      this.queueName,
      0,
      this.batchSize - 1,
    );
    if (users.length > 0) {
      await this.redisClient.zRem(this.queueName, users);
    }
    return users.map((id) => parseInt(id));
  }

  async removeExpiredUsers(): Promise<void> {
    const expiredTimestamp = Date.now() - this.expirationTime;
    await this.redisClient.zRemRangeByScore(
      this.queueName,
      0,
      expiredTimestamp,
    );
  }
}
