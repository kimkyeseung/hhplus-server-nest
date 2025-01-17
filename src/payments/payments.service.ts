import { Injectable } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
import { QueueService } from '../queue/queue.service';
import { ApiException } from '../common/exceptions/api-exception';
import { ApiErrors } from '../common/errors/api-errors';

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
      throw new ApiException(ApiErrors.Payments.ProcessFailed);
    }

    const paymentSuccess = this.simulatePayment();
    if (!paymentSuccess) {
      throw new ApiException(ApiErrors.Payments.ProcessFailed);
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
