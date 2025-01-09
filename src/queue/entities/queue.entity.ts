import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

export enum QueueStatus {
  WAIT = 'wait',
  ACTIVE = 'active',
}
@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User['id'];

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.WAIT })
  status: QueueStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;
}
