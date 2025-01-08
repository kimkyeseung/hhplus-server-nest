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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
