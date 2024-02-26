import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';
import { DosenPembimbingMagang } from 'src/generated/nestjs-dto/dosenPembimbingMagang.entity';

@Controller('dosen-pembimbing')
export class DosenPembimbingMagangController {
  constructor(private readonly dosenPembimbingMagangService: DosenPembimbingMagangService) {}

  @Get()
  async findAll() {
    return this.dosenPembimbingMagangService.findAll();
  }

  @Get(':nip/mahasiswa')
  async findMahasiswa(@Param('nip') nip: string) {
    return this.dosenPembimbingMagangService.findAllMahasiswaBimbingan(nip);
  }

  @Put(':nip')
  async update(@Param('nip') nip: string, @Body() dosenPembimbingMagang: DosenPembimbingMagang) {
    return this.dosenPembimbingMagangService.update(nip, dosenPembimbingMagang);
  }

  @Post()
  async addDosenPembimbingMagang(@Body() dosenPembimbingMagang: DosenPembimbingMagang) {
    return this.dosenPembimbingMagangService.create(dosenPembimbingMagang);
  }

  @Delete(':nip')
  remove(@Param('nip') nip: string) {
    return this.dosenPembimbingMagangService.remove(nip);
  }
}
