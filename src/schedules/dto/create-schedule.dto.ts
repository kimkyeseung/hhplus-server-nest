import { PartialType } from '@nestjs/mapped-types';

export class CreateScheduleDto {
  stageId: number;
  artistId: number;
  schedules: Date[];
}
