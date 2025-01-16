import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { HttpException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAvailableSeats', () => {
    it('should return all seats as available for a valid date', () => {
      const seats = service.getAvailableSeats('2025-01-10');
      expect(seats.length).toBe(50);
      expect(seats.every((seat) => seat.isAvailable)).toBe(true);
    });

    it('should throw an error for an invalid date', () => {
      expect(() => service.getAvailableSeats('2025-01-15')).toThrow(
        HttpException,
      );
    });
  });

  describe('reserveSeat', () => {
    it('should reserve a seat successfully', () => {
      const seat = service.reserveSeat('2025-01-10', 1);
      expect(seat.seatNumber).toBe(1);
      expect(seat.status).toBe('reserved');
      expect(seat.reservedUntil).toBeDefined();
    });

    it('should throw an error for already reserved seat', () => {
      service.reserveSeat('2025-01-10', 1);
      expect(() => service.reserveSeat('2025-01-10', 1)).toThrow(HttpException);
    });

    it('should throw an error for an invalid seat number', () => {
      expect(() => service.reserveSeat('2025-01-10', 100)).toThrow(
        HttpException,
      );
    });
  });
});
