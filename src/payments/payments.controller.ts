// payment.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  /**
   * Process a payment for a reserved seat
   */
  @Post()
  async processPayment(@Body() body: { userId: number; date: string; seatNumber: number }) {
    const { userId, date, seatNumber } = body;

    if (!userId || !date || !seatNumber) {
      throw new HttpException('Missing required fields: userId, date, or seatNumber', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.paymentService.processPayment(userId, date, seatNumber);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
