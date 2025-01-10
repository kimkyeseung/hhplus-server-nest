import { Point } from '../../../src/points/entities/point.entity';
import { Queue } from '../../../src/queue/entities/queue.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Point, (point) => point.user, { cascade: true })
  @JoinColumn()
  point: Point;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Queue, (queue) => queue.user)
  queues: Queue[];
}
