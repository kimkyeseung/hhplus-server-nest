import { Concert } from 'src/concerts/entities/concert.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ReservationStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  price: number;

  @Column()
  seatNumber: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  reservationStatus: ReservationStatus;

  @ManyToOne(() => Concert, (concert) => concert.id)
  @JoinColumn()
  concert: Concert;
}
