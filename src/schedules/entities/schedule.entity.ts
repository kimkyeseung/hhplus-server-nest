import { Artist } from '../../../src/artists/entities/artist.entity';
import { Concert } from '../../../src/concerts/entities/concert.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist)
  @JoinColumn()
  artist: Artist['id'];

  @ManyToOne(() => Concert)
  @JoinColumn()
  concert: Concert['id'];

  @Column()
  datetime: Date;
}
