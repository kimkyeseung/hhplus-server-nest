import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository extends Repository<Artist> {
  constructor(private readonly dataSource: DataSource) {
    super(Artist, dataSource.createEntityManager());
  }

  async findActiveArtists(): Promise<Artist[]> {
    return this.find({ where: {} });
  }
}
