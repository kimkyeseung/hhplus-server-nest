import { Concert } from 'src/concerts/entities/concert.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

type ReservationStatus = 'pending' | 'canceled' | 'success' | 'failed';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  price: number;

  @Column()
  seatNumber: number;

  @Column({ default: 'pending' })
  reservationStatus: ReservationStatus;

  @ManyToOne(() => Concert, (concert) => concert.id)
  concertId: Concert['id'];
}
