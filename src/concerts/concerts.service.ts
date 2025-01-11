import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Concert } from './entities/concert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    private readonly schedulesService: SchedulesService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createConcertDto: CreateConcertDto) {
    const { dates, artistId, price } = createConcertDto;

    const artist = this.artistRepository.findOne({ where: { id: artistId } });
    if (!artist) {
      throw NotFoundException;
    }

    const concert = this.concertRepository.create(createConcertDto);
    await this.concertRepository.save(concert);

    const tickets = Array.from({ length: 50 }, (_, index) =>
      this.ticketRepository.create({
        seatNumber: index + 1,
        concert,
        price,
      }),
    );
    await this.ticketRepository.save(tickets);

    this.schedulesService.create({
      dates,
      artistId,
      concertId: concert.id,
    });

    return concert;
  }

  findAll(artistId?: number, date?: string) {
    const query = this.concertRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.artistId', 'artist')
      .leftJoinAndSelect('concert.schedules', 'schedule');

    if (artistId) {
      query.andWhere('artist.id = :artistId', { artistId });
    }

    if (date) {
      query.andWhere('DATE(schedule.datetime) = :date', { date });
    }

    return query.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} concert`;
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  remove(id: number) {
    return `This action removes a #${id} concert`;
  }
}
