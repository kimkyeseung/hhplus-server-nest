import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedules.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService, ScheduleRepository],
  exports: [ScheduleRepository, SchedulesService],
})
export class SchedulesModule {}
