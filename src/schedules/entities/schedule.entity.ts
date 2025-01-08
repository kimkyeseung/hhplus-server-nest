import { Artist } from 'src/artists/entities/artist.entity';
import { Concert } from 'src/concerts/entities/concert.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artistId: Artist['id'];

  @ManyToOne(() => Concert, (concert) => concert.id)
  concertId: Concert['id'];

  @Column()
  datetime: Date;
}
