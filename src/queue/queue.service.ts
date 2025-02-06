import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class QueueService {
  private readonly redisClient;
  private readonly queueName = 'user_queue';

  constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  /** 사용자 대기열 추가 **/
  async addToQueue(userId: number): Promise<void> {
    const timestamp = Date.now();
    await this.redisClient.zAdd(this.queueName, [
      { score: timestamp, value: userId.toString() },
    ]);
  }

  /** 사용자 대기 순번 조회 **/
  async getQueuePosition(userId: number): Promise<number | null> {
    const position = await this.redisClient.zRank(
      this.queueName,
      userId.toString(),
    );
    return position !== null ? position + 1 : null;
  }

  /** 대기열 상태 조회 **/
  async getUserQueueStatus(
    userId: number,
  ): Promise<{ position: number | null }> {
    const position = await this.getQueuePosition(userId);
    return { position };
  }

  /** 대기열 활성화 (일정 수의 사용자 처리) **/
  async activateQueue(batchSize: number): Promise<number[]> {
    const users = await this.redisClient.zRange(
      this.queueName,
      0,
      batchSize - 1,
    );
    if (users.length > 0) {
      await this.redisClient.zRem(this.queueName, users);
    }
    return users.map((id) => parseInt(id));
  }

  /** 만료된 사용자 제거 **/
  async removeExpiredUsers(expirationTime: number): Promise<void> {
    const expiredTimestamp = Date.now() - expirationTime;
    await this.redisClient.zRemRangeByScore(
      this.queueName,
      0,
      expiredTimestamp,
    );
  }
}
