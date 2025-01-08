import { Controller } from '@nestjs/common';
import { PointHistoryService } from './point-history.service';

@Controller('point-history')
export class PointHistoryController {
  constructor(private readonly pointHistoryService: PointHistoryService) {}
}
