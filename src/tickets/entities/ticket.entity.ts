import { Stage } from 'src/stages/entities/stage.entity';
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

  @ManyToOne(() => Stage, (stage) => stage.id)
  stageId: Stage['id'];
}
