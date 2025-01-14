import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { PointHistory } from './entities/point-history.entity';
import { PointRepository } from './points.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Point, PointHistory])],
  controllers: [PointsController],
  providers: [PointsService, PointRepository],
})
export class PointModule {}
