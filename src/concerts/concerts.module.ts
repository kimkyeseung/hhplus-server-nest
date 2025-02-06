import { Module } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { SchedulesService } from '../../src/schedules/schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Schedule } from '../../src/schedules/entities/schedule.entity';
import { Artist } from '../../src/artists/entities/artist.entity';
import { Ticket } from '../../src/tickets/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Schedule, Artist, Ticket])],
  controllers: [ConcertsController],
  providers: [ConcertsService, SchedulesService],
})
export class ConcertsModule {}
