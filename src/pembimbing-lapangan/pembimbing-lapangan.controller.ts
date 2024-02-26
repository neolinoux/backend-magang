import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';
import { PembimbingLapangan } from 'src/generated/nestjs-dto/pembimbingLapangan.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pembimbing Lapangan')
@Controller('pembimbing-lapangan')
export class PembimbingLapanganController {
  constructor(private readonly pembimbingLapanganService: PembimbingLapanganService) {}

  @Post()
  create(@Body() pembimbingLapangan: PembimbingLapangan) {
    return this.pembimbingLapanganService.create(pembimbingLapangan);
  }

  @Get()
  findAll() {
    return this.pembimbingLapanganService.findAll();
  }

  @Patch(':nip')
  update(@Param('nip') nip: string, @Body() pembimbingLapangan: PembimbingLapangan) {
    return this.pembimbingLapanganService.update(nip, pembimbingLapangan);
  }

  @Delete(':nip')
  remove(@Param('nip') nip: string) {
    return this.pembimbingLapanganService.remove(nip);
  }

  @Get(':nip/mahasiswa')
  findMahasiswaBimbinganPemlap(@Param('nip') nip: string) {
    return this.pembimbingLapanganService.findAllMahasiswaBimbingan(nip);
  }
}
