import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly queueService: QueueService,
  ) {}

  async processPayment(
    userId: number,
    date: string,
    seatNumber: number,
  ): Promise<{ status: string }> {
    const seat = this.reservationService.reserveSeat(date, seatNumber);

    if (seat.status !== 'reserved') {
      throw new HttpException('Seat is not reserved', HttpStatus.BAD_REQUEST);
    }

    const paymentSuccess = this.simulatePayment();
    if (!paymentSuccess) {
      throw new HttpException('Payment failed', HttpStatus.PAYMENT_REQUIRED);
    }

    seat.status = 'reserved';
    seat.reservedUntil = undefined;

    await this.queueService.expireToken(userId);

    return { status: 'success' };
  }

  private simulatePayment(): boolean {
    return true;
  }
}
