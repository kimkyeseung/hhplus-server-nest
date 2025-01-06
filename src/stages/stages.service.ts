import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Stage } from './entities/stage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    private readonly schedulesService: SchedulesService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createStageDto: CreateStageDto) {
    const { schedules, artistId } = createStageDto;

    const artist = this.artistRepository.findOne({ where: { id: artistId } });
    if (!artist) {
      throw NotFoundException;
    }

    const stage = this.stageRepository.create(createStageDto);
    await this.stageRepository.save(stage);

    this.schedulesService.create({
      schedules,
      artistId,
      stageId: stage.id,
    });

    return stage;
  }

  findAll() {
    return `This action returns all stages`;
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
