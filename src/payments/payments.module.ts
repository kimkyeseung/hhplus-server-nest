import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ReservationService } from 'src/reservation/reservation.service';
import { QueueService } from 'src/queue/queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from 'src/queue/entities/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  controllers: [PaymentsController],
  providers: [PaymentsService, ReservationService, QueueService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
