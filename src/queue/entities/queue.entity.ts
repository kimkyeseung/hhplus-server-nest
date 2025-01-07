import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';

export enum QueueStatus {
  WAIT = 'wait',
  ACTIVE = 'active',
}
@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: User['id'];

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.WAIT })
  status: QueueStatus;

  @CreateDateColumn()
  createdAt: Date;
}
