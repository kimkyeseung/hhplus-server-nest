import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { SchedulesService } from 'src/schedules/schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Schedule, Artist])],
  controllers: [StagesController],
  providers: [StagesService, SchedulesService],
})
export class StagesModule {}
