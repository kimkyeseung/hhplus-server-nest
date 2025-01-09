import { Point } from 'src/points/entities/point.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum PointHistoryType {
  PAYMENT = 'payment',
  CHARGE = 'charge',
}

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Point)
  point: Point;

  @Column({ default: 0 })
  balance: number;

  @Column()
  type: PointHistoryType;

  @CreateDateColumn()
  createdAt: Date;
}
