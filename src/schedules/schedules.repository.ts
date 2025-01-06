import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {
  constructor(private readonly dataSource: DataSource) {
    super(Schedule, dataSource.createEntityManager());
  }

  async findSchedulesByArtist(
    artistId: FindOptionsWhere<Artist['id']>,
  ): Promise<Schedule[]> {
    return this.find({ where: { artistId } });
  }
}
