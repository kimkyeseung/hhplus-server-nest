import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    const startTime = Date.now();

    this.logger.log(`Incoming request: ${method} ${url}`, {
      body,
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - startTime;
        this.logger.log(`Response sent: ${method} ${url}`, {
          elapsedTime: `${elapsedTime}ms`,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }
}
