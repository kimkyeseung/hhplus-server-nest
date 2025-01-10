import { Test, TestingModule } from '@nestjs/testing';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { PaymentsService } from '../../src/payments/payments.service';
import { QueueService } from '../../src/queue/queue.service';
import { ReservationService } from '../../src/reservation/reservation.service';
import { DatabaseModule } from '../../src/database/database.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from '../../src/queue/entities/queue.entity';
import { User } from '../../src/users/entities/user.entity';
import { Point } from '../../src/points/entities/point.entity';
import { Repository } from 'typeorm';

describe('Integration Test', () => {
  let paymentService: PaymentsService;
  let queueService: QueueService;
  let reservationService: ReservationService;
  let mysqlContainer: StartedMySqlContainer;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const container = new MySqlContainer('mysql:8')
      .withDatabase('dbname')
      .withUser('root')
      .withRootPassword('pw');

    mysqlContainer = await container.start();

    process.env.DB_HOST = mysqlContainer.getHost();
    process.env.DB_PORT = mysqlContainer.getPort().toString();
    process.env.DB_USERNAME = mysqlContainer.getUsername();
    process.env.DB_PASSWORD = mysqlContainer.getUserPassword();
    process.env.DB_DATABASE = mysqlContainer.getDatabase();
    process.env.NODE_ENV = 'test';
  }, 30000);

  afterAll(async () => {
    await mysqlContainer.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Queue, User, Point])],
      providers: [PaymentsService, QueueService, ReservationService],
    }).compile();

    paymentService = module.get<PaymentsService>(PaymentsService);
    queueService = module.get<QueueService>(QueueService);
    reservationService = module.get<ReservationService>(ReservationService);
    userRepository = module.get<Repository<User>>(
      getRepositoryToken(Repository),
    );

    await userRepository.save({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('should process full user flow successfully', async () => {
    // Step 1: Add user to queue
    const userId = 1;
    const queueItem = await queueService.addToQueue(userId);
    expect(queueItem).toBeDefined();
    expect(queueItem.user).toBe(userId);
    expect(queueItem.status).toBe('WAIT');

    // Step 2: Activate queue
    const activatedQueues = await queueService.activateQueue(1);
    expect(activatedQueues).toHaveLength(1);
    expect(activatedQueues[0].status).toBe('ACTIVE');

    // Step 3: Reserve seat
    const date = '2025-01-10';
    const seatNumber = 1;
    const reservedSeat = reservationService.reserveSeat(date, seatNumber);
    expect(reservedSeat.status).toBe('reserved');

    // Step 4: Process payment
    const paymentResult = await paymentService.processPayment(
      userId,
      date,
      seatNumber,
    );
    expect(paymentResult.status).toBe('success');

    // Verify queue token expired
    const queueAfterPayment = await queueService.getQueue(userId);
    expect(queueAfterPayment).toBeNull();
  });

  it('should fail payment if user is not in queue', async () => {
    const userId = 99; // Non-existent user
    const date = '2025-01-10';
    const seatNumber = 1;

    await expect(
      paymentService.processPayment(userId, date, seatNumber),
    ).rejects.toThrow('User not found in the queue');
  });
});
