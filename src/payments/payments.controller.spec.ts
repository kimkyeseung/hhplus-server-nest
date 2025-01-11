import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { QueueService } from '../queue/queue.service';
import { ReservationService } from '../reservation/reservation.service';
import { HttpException } from '@nestjs/common';

describe('PaymentController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentsService;
  let queueService: QueueService;
  let reservationService: ReservationService;

  const mockPaymentService = {
    processPayment: jest.fn(),
  };

  const mockQueueService = {
    expireToken: jest.fn(),
  };

  const mockReservationService = {
    reserveSeat: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentService,
        },
        {
          provide: QueueService,
          useValue: mockQueueService,
        },
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>(PaymentsService);
    queueService = module.get<QueueService>(QueueService);
    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processPayment', () => {
    it('should process payment successfully', async () => {
      const mockBody = { userId: 1, date: '2025-01-10', seatNumber: 1 };
      mockPaymentService.processPayment.mockResolvedValue({
        status: 'success',
      });

      const result = await controller.processPayment(mockBody);

      expect(result).toEqual({ status: 'success' });
      expect(paymentService.processPayment).toHaveBeenCalledWith(
        mockBody.userId,
        mockBody.date,
        mockBody.seatNumber,
      );
    });

    it('should throw an error if required fields are missing', async () => {
      const mockBody = { userId: undefined, date: '2025-01-10', seatNumber: 1 };

      await expect(controller.processPayment(mockBody)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.processPayment(mockBody)).rejects.toThrow(
        'Missing required fields: userId, date, or seatNumber',
      );
    });

    it('should throw an error if paymentService fails', async () => {
      const mockBody = { userId: 1, date: '2025-01-10', seatNumber: 1 };
      mockPaymentService.processPayment.mockRejectedValue(
        new HttpException('Payment failed', 402),
      );

      await expect(controller.processPayment(mockBody)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.processPayment(mockBody)).rejects.toThrow(
        'Payment failed',
      );
    });
  });
});
