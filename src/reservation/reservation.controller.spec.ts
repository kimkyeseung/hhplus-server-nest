// reservation.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  const mockReservationService = {
    getAvailableDates: jest.fn(),
    getAvailableSeats: jest.fn(),
    reserveSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('reserveSeat', () => {
    it('should reserve a seat for a valid date and seat number', async () => {
      const mockSeat = {
        seatNumber: 1,
        status: 'reserved',
        reservedUntil: new Date(),
      };
      mockReservationService.reserveSeat.mockReturnValue(mockSeat);

      const result = controller.reserveSeat({
        date: '2025-01-10',
        seatNumber: 1,
      });
      expect(result).toEqual(mockSeat);
      expect(service.reserveSeat).toHaveBeenCalledWith('2025-01-10', 1);
    });

    it('should throw HttpException if date or seatNumber is missing', async () => {
      await expect(() =>
        controller.reserveSeat({ date: undefined, seatNumber: 1 }),
      ).toThrow(HttpException);
      await expect(() =>
        controller.reserveSeat({ date: '2025-01-10', seatNumber: undefined }),
      ).toThrow(HttpException);
    });

    it('should throw HttpException if seat is already reserved', async () => {
      mockReservationService.reserveSeat.mockImplementation(() => {
        throw new Error('Seat already reserved');
      });

      await expect(() =>
        controller.reserveSeat({ date: '2025-01-10', seatNumber: 1 }),
      ).toThrow(HttpException);
      await expect(() =>
        controller.reserveSeat({ date: '2025-01-10', seatNumber: 1 }),
      ).toThrow(
        new HttpException('Seat already reserved', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
