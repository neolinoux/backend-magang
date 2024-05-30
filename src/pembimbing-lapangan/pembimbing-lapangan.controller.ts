import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePembimbingLapanganDto } from 'src/generated/nestjs-dto/create-pembimbingLapangan.dto';
import { UpdatePembimbingLapanganDto } from 'src/generated/nestjs-dto/update-pembimbingLapangan.dto';

@ApiTags('Pembimbing Lapangan')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('pembimbing-lapangan')
export class PembimbingLapanganController {
  constructor(private readonly pembimbingLapanganService: PembimbingLapanganService) {}

  @Get()
  findAll(
    @Query() params: {
      nip: string,
      tahunAjaran: string,
    }
  ) {
    return this.pembimbingLapanganService.findAllPemlapBy(params);
  }

  @Post()
  create(@Body() createPembimbingLapangan: CreatePembimbingLapanganDto) {
    return this.pembimbingLapanganService.create(createPembimbingLapangan);
  }

  @Put(':pemlapId')
  update(
    @Param('pemlapId') pemlapId: number,
    @Body() updatePembimbingLapangan: UpdatePembimbingLapanganDto
  ) {
    return this.pembimbingLapanganService.update(pemlapId, updatePembimbingLapangan);
  }

  @Delete(':pemlapId')
  remove(
    @Param('pemlapId') pemlapId: number
  ) {
    return this.pembimbingLapanganService.remove(pemlapId);
  }
}
