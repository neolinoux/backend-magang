import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll(@Param() params: any) {
    return this.pembimbingLapanganService.findAllPemlapBy(params);
  }

  @Post()
  create(@Body() createPembimbingLapangan: CreatePembimbingLapanganDto) {
    return this.pembimbingLapanganService.create(createPembimbingLapangan);
  }

  @Patch(':nip')
  update(@Param('nip') nip: string, @Body() updatePembimbingLapangan: UpdatePembimbingLapanganDto) {
    return this.pembimbingLapanganService.update(nip, updatePembimbingLapangan);
  }

  @Delete(':nip')
  remove(@Param('nip') nip: string) {
    return this.pembimbingLapanganService.remove(nip);
  }
}
