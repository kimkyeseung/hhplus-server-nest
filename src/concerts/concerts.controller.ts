import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Post()
  create(@Body() createConcertDto: CreateConcertDto) {
    return this.concertsService.create(createConcertDto);
  }

  @Get()
  findAll(@Query('artistId') artistId?: number, @Query('date') date?: string) {
    return this.concertsService.findAll(artistId, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertsService.findOne(+id);
  }

  @Get(':id/availability')
  findAvailableOne(@Param('id') id: string) {
    return this.concertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto) {
    return this.concertsService.update(+id, updateConcertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertsService.remove(+id);
  }
}
