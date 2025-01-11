import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  ticketId: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
