export const ApiErrors = {
  Payments: {
    InvalidAmount: {
      code: 'PAYMENTS_INVALID_AMOUNT',
      message: 'The payment amount must be greater than 0.',
      statusCode: 400,
    },
    ProcessFailed: {
      code: 'PAYMENTS_PROCESS_FAILED',
      message: 'Failed to process the payment.',
      statusCode: 500,
    },
    NotFound: {
      code: 'PAYMENTS_NOT_FOUND',
      message: 'The requested payment does not exist.',
      statusCode: 404,
    },
  },
  Users: {
    NotFound: {
      code: 'USERS_NOT_FOUND',
      message: 'The user does not exist.',
      statusCode: 404,
    },
    InvalidEmail: {
      code: 'USERS_INVALID_EMAIL',
      message: 'The email address provided is invalid.',
      statusCode: 400,
    },
    DuplicateEmail: {
      code: 'USERS_DUPLICATE_EMAIL',
      message: 'A user with this email already exists.',
      statusCode: 409,
    },
  },
  Concerts: {
    NotFound: {
      code: 'CONCERTS_NOT_FOUND',
      message: 'The concert does not exist.',
      statusCode: 404,
    },
    TicketsSoldOut: {
      code: 'CONCERTS_TICKETS_SOLD_OUT',
      message: 'All tickets for this concert are sold out.',
      statusCode: 400,
    },
    InvalidDate: {
      code: 'CONCERTS_INVALID_DATE',
      message: 'The concert date provided is invalid.',
      statusCode: 400,
    },
  },
  Schedules: {
    NotFound: {
      code: 'SCHEDULES_NOT_FOUND',
      message: 'The schedule does not exist.',
      statusCode: 404,
    },
    Conflict: {
      code: 'SCHEDULES_CONFLICT',
      message: 'The schedule conflicts with an existing one.',
      statusCode: 409,
    },
    InvalidTime: {
      code: 'SCHEDULES_INVALID_TIME',
      message: 'The time provided for the schedule is invalid.',
      statusCode: 400,
    },
  },
  Tickets: {
    NotFound: {
      code: 'TICKETS_NOT_FOUND',
      message: 'The ticket does not exist.',
      statusCode: 404,
    },
    AlreadyBooked: {
      code: 'TICKETS_ALREADY_BOOKED',
      message: 'The ticket has already been booked.',
      statusCode: 400,
    },
    BookingFailed: {
      code: 'TICKETS_BOOKING_FAILED',
      message: 'Failed to book the ticket.',
      statusCode: 500,
    },
  },
  Reservations: {
    NotFound: {
      code: 'RESERVATIONS_NOT_FOUND',
      message: 'The reservation does not exist.',
      statusCode: 404,
    },
    SeatUnavailable: {
      code: 'RESERVATIONS_SEAT_UNAVAILABLE',
      message: 'The selected seat is unavailable.',
      statusCode: 400,
    },
    DateUnavailable: {
      code: 'RESERVATIONS_DATE_UNAVAILABLE',
      message: 'Invalid reservation date.',
      statusCode: 400,
    },
    Failed: {
      code: 'RESERVATIONS_FAILED',
      message: 'Failed to create the reservation.',
      statusCode: 500,
    },
  },
  Orders: {
    NotFound: {
      code: 'ORDERS_NOT_FOUND',
      message: 'The order does not exist.',
      statusCode: 404,
    },
    InvalidPayment: {
      code: 'ORDERS_INVALID_PAYMENT',
      message: 'The payment information provided is invalid.',
      statusCode: 400,
    },
    CreationFailed: {
      code: 'ORDERS_CREATION_FAILED',
      message: 'Failed to create the order.',
      statusCode: 500,
    },
  },
  Queue: {
    NotFound: {
      code: 'USER_NOT_FOUND_IN_THE_QUEUE',
      message: 'User doesn not exist.',
      statusCode: 404,
    },
  },
  Point: {
    BadRequest: {
      code: 'POINT_N_OT_ENOUGH',
      message: 'The point is not enough to use.',
      statusCode: 400,
    },
  },
};
