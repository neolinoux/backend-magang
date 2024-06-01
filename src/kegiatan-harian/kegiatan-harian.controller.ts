import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { KegiatanHarianService } from './kegiatan-harian.service';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { TipeKegiatan } from 'src/generated/nestjs-dto/tipeKegiatan.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTipeKegiatanDto } from 'src/generated/nestjs-dto/create-tipeKegiatan.dto';
import { UpdateTipeKegiatanDto } from 'src/generated/nestjs-dto/update-tipeKegiatan.dto';

@ApiTags('Kegiatan Harian')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('kegiatan-harian')
export class KegiatanHarianController {
  constructor(private readonly kegiatanHarianService: KegiatanHarianService) {}

  // TIPE KEGIATAN
  @Get('tipe-kegiatan')
  findAllTipeKegiatan(
    @Query() params: {
      nama: string
    }
  ) {
    return this.kegiatanHarianService.findAllTipeKegiatan(params);
  }

  @Post('tipe-kegiatan/:mahasiswaId')
  createTipeKegiatan(
    @Body() tipeKegiatan: CreateTipeKegiatanDto,
    @Param('mahasiswaId') mahasiswaId: number
  ) {
    return this.kegiatanHarianService.createTipeKegiatan(tipeKegiatan, +mahasiswaId);
  }

  @Put('tipe-kegiatan/:tipeKegiatanId')
  updateTipeKegiatan(
    @Param('tipeKegiatanId') tipeKegiatanId: number,
    @Body() tipeKegiatan: UpdateTipeKegiatanDto
  ) {
    return this.kegiatanHarianService.updateTipeKegiatan(+tipeKegiatanId, tipeKegiatan);
  }

  @Delete('tipe-kegiatan/:tipeKegiatanId')
  removeTipeKegiatan(@Param('tipeKegiatanId') tipeKegiatanId: number) {
    return this.kegiatanHarianService.removeTipeKegiatan(+tipeKegiatanId);
  }

  // CATATAN KEGIATAN HARIAN
  @Get()
  findAllKegiatanHarianMahasiswa(
    @Query() params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      statusPenyelesaian: number,
      namaTipeKegiatan: string
    }
  ) {
    return this.kegiatanHarianService.findAllKegiatanHarianBy(params);
  }

  @Post(':mahasiswaId')
  createKegiatanHarian(
    @Body() createKegiatanHarianDto: CreateKegiatanHarianDto,
    @Param('mahasiswaId') mahasiswaId: number
  ) {
    return this.kegiatanHarianService.createKegiatanHarian(createKegiatanHarianDto, +mahasiswaId);
  }

  @Put('/:kegiatanHarianId')
  updateKegiatanHarian(
    @Param('kegiatanHarianId') kegiatanHarianId: number,
    @Body() updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
    return this.kegiatanHarianService.updateKegiatanHarian(+kegiatanHarianId, updateKegiatanHarianDto);
  }

  @Put('konfirmasi/:kegiatanHarianId')
  konfirmasiKegiatanHarian(
    @Param('kegiatanHarianId') kegiatanHarianId: number,
    @Body() kegiatanHarian: UpdateKegiatanHarianDto,
  ) {
    return this.kegiatanHarianService.konfirmasiKegiatanHarian(+kegiatanHarianId, kegiatanHarian);
  }

  @Delete(':kegiatanHarianId')
  remove(@Param('kegiatanHarianId') kegiatanHarianId: number) {
    return this.kegiatanHarianService.remove(+kegiatanHarianId);
  }
}
