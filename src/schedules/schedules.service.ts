import { Injectable } from '@nestjs/common';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    const { schedules, artistId, stageId } = createScheduleDto;
    const repository = this.scheduleRepository;

    const result = schedules.map((date: Date) => {
      const schedule = repository.create({
        datetime: new Date(date),
        artistId,
        stageId,
      });
      this.scheduleRepository.save(schedule);
      return schedule;
    });

    return result;
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
