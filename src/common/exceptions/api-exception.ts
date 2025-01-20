import { HttpException, HttpStatus } from '@nestjs/common';

export interface Exception {
  code: string;
  message: string;
  statusCode: HttpStatus;
}

export class ApiException extends HttpException {
  constructor(public readonly exception: Exception) {
    const { code, message, statusCode = HttpStatus.BAD_REQUEST } = exception;
    super({ code, message }, statusCode);
  }
}
