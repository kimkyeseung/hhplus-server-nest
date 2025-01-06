import { Artist } from 'src/artists/entities/artist.entity';
import { Stage } from 'src/stages/entities/stage.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artistId: Artist['id'];

  @ManyToOne(() => Stage, (stage) => stage.id)
  stageId: Stage['id'];

  @Column()
  datetime: Date;
}
