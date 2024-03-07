import { KegiatanBulananService } from './kegiatan-bulanan.service';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/create-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/update-rekapKegiatanBulanan.dto';

@ApiTags('Kegiatan Bulanan')
@Controller('kegiatan-bulanan')
export class KegiatanBulananController {
  constructor(private readonly kegiatanBulananService: KegiatanBulananService) {}

  @Post()
  create(@Body() createRekapKegiatanBulananDto: CreateRekapKegiatanBulananDto) {
    return this.kegiatanBulananService.create(createRekapKegiatanBulananDto);
  }

  @Get()
  findAll() {
    return this.kegiatanBulananService.findAll();
  }

  @Get('mahasiswa/:nim')
  findRekapMahasiswa(@Param('nim') nim: string) {
    return this.kegiatanBulananService.findRekapMahasiswa(nim);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto) {
    return this.kegiatanBulananService.update(+id, updateRekapKegiatanBulananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanBulananService.remove(+id);
  }
}
