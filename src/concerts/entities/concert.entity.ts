import { Artist } from 'src/artists/entities/artist.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artistId: Artist['id'];

  @OneToMany(() => Schedule, (schedule) => schedule.concert)
  schedules: Schedule[];
}
