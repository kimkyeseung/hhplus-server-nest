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
import { PointModule } from './points/points.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentsModule } from './payments/payments.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './utils/winston.config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

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
    ReservationModule,
    PaymentsModule,
    WinstonModule.forRoot({ instance: winstonLogger }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: 'mysql',
        port: 3306,
        password: 'pw',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
