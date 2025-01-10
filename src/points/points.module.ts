import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { PointHistory } from './entities/point-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, PointHistory])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointModule {}
