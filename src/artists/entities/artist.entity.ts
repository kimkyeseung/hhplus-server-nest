import { Concert } from 'src/concerts/entities/concert.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Concert, (concert) => concert.artistId)
  concerts: Concert[];
}
