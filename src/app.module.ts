import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { StagesModule } from './stages/stages.module';
import { ArtistsModule } from './artists/artists.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    StagesModule,
    ArtistsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
