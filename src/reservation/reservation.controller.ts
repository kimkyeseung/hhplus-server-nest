import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReservationService, SeatReservation } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * Get available reservation dates
   */
  @Get('dates')
  getAvailableDates() {
    return this.reservationService.getAvailableDates();
  }

  /**
   * Get available seats for a specific date
   */
  @Get('seats')
  getAvailableSeats(@Query('date') date: string) {
    if (!date) {
      throw new HttpException(
        'Date query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return this.reservationService.getAvailableSeats(date);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reserve')
  reserveSeat(
    @Body() body: { date: string; seatNumber: number },
  ): SeatReservation {
    const { date, seatNumber } = body;

    if (!date || !seatNumber) {
      throw new HttpException(
        'Date and seatNumber are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return this.reservationService.reserveSeat(date, seatNumber);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
