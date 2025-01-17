import { Injectable } from '@nestjs/common';
import { ApiErrors } from '../../src/common/errors/api-errors';
import { ApiException } from '../../src/common/exceptions/api-exception';

export interface SeatReservation {
  seatNumber: number;
  status: 'available' | 'reserved';
  reservedUntil?: Date;
}

@Injectable()
export class ReservationService {
  private availableDates: string[] = ['2025-01-10', '2025-01-11', '2025-01-12'];
  private seatCount = 50;
  private seatReservations: Record<string, SeatReservation[]> = {};

  getAvailableDates(): string[] {
    return this.availableDates;
  }

  getAvailableSeats(
    date: string,
  ): { seatNumber: number; isAvailable: boolean }[] {
    if (!this.availableDates.includes(date)) {
      throw new ApiException(ApiErrors.Reservations.SeatUnavailable);
    }

    if (!this.seatReservations[date]) {
      this.initializeSeats(date);
    }

    this.cleanupExpiredReservations(date);

    return this.seatReservations[date].map((seat) => ({
      seatNumber: seat.seatNumber,
      isAvailable: seat.status === 'available',
    }));
  }

  reserveSeat(date: string, seatNumber: number): SeatReservation {
    if (!this.availableDates.includes(date)) {
      throw new ApiException(ApiErrors.Reservations.DateUnavailable);
    }

    if (!this.seatReservations[date]) {
      this.initializeSeats(date);
    }

    this.cleanupExpiredReservations(date);

    const seat = this.seatReservations[date].find(
      (s) => s.seatNumber === seatNumber,
    );

    if (!seat) {
      throw new ApiException(ApiErrors.Reservations.SeatUnavailable);
    }

    if (
      seat.status === 'reserved' &&
      seat.reservedUntil &&
      new Date() < seat.reservedUntil
    ) {
      throw new ApiException(ApiErrors.Reservations.SeatUnavailable);
    }

    seat.status = 'reserved';
    seat.reservedUntil = new Date(Date.now() + 5 * 60 * 1000); // Reserve for 5 minutes

    return seat;
  }

  private initializeSeats(date: string): void {
    this.seatReservations[date] = Array.from(
      { length: this.seatCount },
      (_, index) => ({
        seatNumber: index + 1,
        status: 'available',
      }),
    );
  }

  public cleanupExpiredReservations(date: string): void {
    const now = new Date();

    if (!this.seatReservations[date]) {
      throw new ApiException(ApiErrors.Reservations.DateUnavailable);
    }

    this.seatReservations[date] = this.seatReservations[date].map((seat) => {
      if (
        seat.status === 'reserved' &&
        seat.reservedUntil &&
        now > seat.reservedUntil
      ) {
        return {
          ...seat,
          status: 'available',
          reservedUntil: undefined,
        };
      }
      return seat;
    });
  }
}
