import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { QueueTokenService } from './queue-token.service';

class GenerateTokenDto {
  userId: number;
}

@Controller('queue-token')
export class QueueTokenController {
  constructor(private readonly queueTokenService: QueueTokenService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generateToken(@Body() generateTokenDto: GenerateTokenDto) {
    const { userId } = generateTokenDto;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const { token, queueInfo } =
      await this.queueTokenService.generateToken(userId);
    return { token, queueInfo };
  }
}
