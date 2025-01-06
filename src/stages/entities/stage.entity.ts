import { Artist } from 'src/artists/entities/artist.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artistId: Artist['id'];
}
