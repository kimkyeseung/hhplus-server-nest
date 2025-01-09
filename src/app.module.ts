import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { ConcertsModule } from './concerts/concerts.module';
import { ArtistsModule } from './artists/artists.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TicketsModule } from './tickets/tickets.module';
import { QueueModule } from './queue/queue.module';
import { OrdersModule } from './orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PointModule } from './point/point.module';
import { PointHistoryModule } from './point-history/point-history.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConcertsModule,
    ArtistsModule,
    SchedulesModule,
    TicketsModule,
    QueueModule,
    OrdersModule,
    ScheduleModule.forRoot(),
    PointModule,
    PointHistoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
