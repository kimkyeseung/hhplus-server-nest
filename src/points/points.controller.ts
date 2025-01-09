import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post('charge')
  async chargePoints(
    @Body() chargePointsDto: { userId: number; amount: number },
  ) {
    return await this.pointsService.chargePoints(
      chargePointsDto.userId,
      chargePointsDto.amount,
    );
  }

  @Get(':userId')
  async getPoints(@Param('userId') userId: number) {
    return await this.pointsService.getPoints(userId);
  }

  @Get(':userId/history')
  async getPointHistory(
    @Param('userId') userId: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return await this.pointsService.getPointHistory(userId, limit, offset);
  }
}
