import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('api')
export class AppController {
  // 1. 유저 토큰 발급 API
  @Post('users/token')
  generateToken(@Body('userId') userId: number) {
    return {
      success: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MzEyMzYwMH0.xY8nXUK9ZP5mE7IhdG5wVUpTw',
    };
  }

  // 2. 예약 가능 날짜 / 좌석 API
  @Get('concerts/:concertId/availability')
  getConcertAvailability(@Param('concertId') concertId: number) {
    return {
      concertId,
      title: '싸이의 50명 흠뻑쇼',
      startDate: '2025-01-20T19:00:00Z',
      location: '서울대공원',
      seatCount: 50,
      availableSeats: ['A1', 'A2', 'A3', 'B1', 'B2'],
    };
  }

  // 3. 좌석 예약 요청 API
  @Post('tickets/reserve')
  reserveTicket(
    @Body() body: { userId: number; concertId: number; seatNumber: string },
  ) {
    const { userId, concertId, seatNumber } = body;
    return {
      success: true,
      ticketId: 101,
      reservationStatus: 'reserved',
      seatNumber,
      concertId,
      userId,
    };
  }

  // 4. 잔액 충전 / 조회 API
  @Get('users/:userId/balance')
  getBalance(@Param('userId') userId: number) {
    return {
      userId,
      point: 5000,
    };
  }

  @Post('users/:userId/charge')
  chargeBalance(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return {
      success: true,
      newBalance: 15000,
    };
  }

  // 5. 결제 API
  @Post('payments')
  makePayment(
    @Body() body: { userId: number; ticketId: number; method: string },
  ) {
    const { userId, ticketId, method } = body;
    return {
      success: true,
      paymentId: 201,
      status: 'done',
      ticketId,
      orderId: 301,
      method,
    };
  }
}
