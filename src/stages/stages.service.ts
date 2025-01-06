import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Stage } from './entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    private readonly schedulesService: SchedulesService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createStageDto: CreateStageDto) {
    const { dates, artistId, price } = createStageDto;

    const artist = this.artistRepository.findOne({ where: { id: artistId } });
    if (!artist) {
      throw NotFoundException;
    }

    const stage = this.stageRepository.create(createStageDto);
    await this.stageRepository.save(stage);

    const tickets = Array.from({ length: 50 }, (_, index) =>
      this.ticketRepository.create({
        seatNumber: index + 1,
        stageId: stage.id,
        price,
      }),
    );
    await this.ticketRepository.save(tickets);

    this.schedulesService.create({
      dates,
      artistId,
      stageId: stage.id,
    });

    return stage;
  }

  findAll(artistId?: number, date?: string) {
    const query = this.stageRepository
      .createQueryBuilder('stage')
      .leftJoinAndSelect('stage.artistId', 'artist')
      .leftJoinAndSelect('stage.schedules', 'schedule');

    if (artistId) {
      query.andWhere('artist.id = :artistId', { artistId });
    }

    if (date) {
      query.andWhere('DATE(schedule.datetime) = :date', { date });
    }

    return query.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} stage`;
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return `This action updates a #${id} stage`;
  }

  remove(id: number) {
    return `This action removes a #${id} stage`;
  }
}
