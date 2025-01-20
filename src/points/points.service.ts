import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import {
  PointHistory,
  PointHistoryType,
} from './entities/point-history.entity';
import { Repository } from 'typeorm';
import { ApiException } from '../../src/common/exceptions/api-exception';
import { ApiErrors } from '../../src/common/errors/api-errors';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    @InjectRepository(PointHistory)
    private readonly pointHistoryRepository: Repository<PointHistory>,
  ) {}

  async chargePoints(
    userId: number,
    amount: number,
  ): Promise<{ balance: number }> {
    const point = await this.pointRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!point) {
      throw new ApiException(ApiErrors.Users.NotFound);
    }

    point.balance += amount;

    const pointHistory = this.pointHistoryRepository.create({
      user: { id: userId },
      point,
      balance: point.balance,
      type: PointHistoryType.CHARGE,
    });

    await this.pointRepository.save(point);
    await this.pointHistoryRepository.save(pointHistory);

    return { balance: point.balance };
  }

  async usePoints(
    userId: number,
    amount: number,
  ): Promise<{ balance: number }> {
    const point = await this.pointRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!point) {
      throw new ApiException(ApiErrors.Users.NotFound);
    }

    if (point.balance < amount) {
      throw new ApiException(ApiErrors.Point.BadRequest);
    }

    point.balance -= amount;

    const pointHistory = this.pointHistoryRepository.create({
      user: { id: userId },
      point,
      balance: point.balance,
      type: PointHistoryType.PAYMENT,
    });

    await this.pointRepository.save(point);
    await this.pointHistoryRepository.save(pointHistory);

    return { balance: point.balance };
  }

  async getPoints(userId: number): Promise<{ balance: number }> {
    const point = await this.pointRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!point) {
      throw new ApiException(ApiErrors.Users.NotFound);
    }

    return { balance: point.balance };
  }

  async getPointHistory(
    userId: number,
    limit = 10,
    offset = 0,
  ): Promise<{ history: PointHistory[]; total: number }> {
    const [history, total] = await this.pointHistoryRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    if (!history.length) {
      return { history: [], total: 0 };
    }

    return { history, total };
  }
}
