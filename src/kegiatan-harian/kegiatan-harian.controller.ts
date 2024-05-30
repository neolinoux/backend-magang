import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { KegiatanHarianService } from './kegiatan-harian.service';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { TipeKegiatan } from 'src/generated/nestjs-dto/tipeKegiatan.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTipeKegiatanDto } from 'src/generated/nestjs-dto/create-tipeKegiatan.dto';

@ApiTags('Kegiatan Harian')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('kegiatan-harian')
export class KegiatanHarianController {
  constructor(private readonly kegiatanHarianService: KegiatanHarianService) {}

  @Get('tipe-kegiatan')
  findAllTipeKegiatan(
    @Query() params: {
      nama: string
    }
  ) {
    return this.kegiatanHarianService.findAllTipeKegiatan(params);
  }

  // mahasiswa create tipe kegiatan
  @Post('tipe-kegiatan/:mahasiswaId')
  create(
    @Body() tipeKegiatan: CreateTipeKegiatanDto,
    @Param('mahasiswaId') mahasiswaId: number
  ) {
    return this.kegiatanHarianService.createTipeKegiatan(tipeKegiatan, mahasiswaId);
  }

  // get kegiatan harian by mahasiswa
  @Get('mahasiswa/:mahasiswaId')
  findAllKegiatanHarianMahasiswa(
    @Param('mahasiswaId') mahasiswaId: number,
    @Query() params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      statusPenyelesaian: number,
      namaTipeKegiatan: string
    }
  ) {
    return this.kegiatanHarianService.findAllKegiatanHarianMahasiswa(mahasiswaId, params);
  }

  // get kegiatan harian by pembimbing lapangan
  @Get('pembimbing-lapangan/:pemlapId')
  findAllKegiatanHarianPembimbingLapangan(
    @Param('pemlapId') pemlapId: number,
    @Query() params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      statusPenyelesaian: number,
      namaTipeKegiatan: string
    }
  ) {
    return this.kegiatanHarianService.findAllKegiatanHarianPembimbingLapangan(pemlapId, params);
  }

  @Get('dosen-pembimbing/:dosenId')
  findAllKegiatanHarianDosenPembimbing(
    @Param('dosenId') dosenId: number,
    @Query() params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      statusPenyelesaian: number,
      namaTipeKegiatan: string
    }
  ) {
    return this.kegiatanHarianService.findAllKegiatanHarianDosenPembimbing(dosenId, params);
  }

  @Put('konfirmasi/:kegiatanId')
  konfirmasiKegiatanHarian(
    @Param('kegiatanId') kegiatanId: number,
    @Body() konfirmasi: {
      statusPenyelesaian: number
    }
  ) {
    return this.kegiatanHarianService.konfirmasiKegiatanHarian(kegiatanId, konfirmasi);
  }

  @Post(':mahasiswaId')
  createKegiatanHarian(
    @Body() createKegiatanHarian: CreateKegiatanHarianDto,
    @Param('mahasiswaId') mahasiswaId: number,
  ) {
    return this.kegiatanHarianService.createKegiatanHarian(createKegiatanHarian, mahasiswaId);
  }

  @Put(':kegiatanHarianId')
  updateKegiatanHarian(
    @Param('kegiatanHarianId') kegiatanHarianId: number,
    @Body() updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
    return this.kegiatanHarianService.updateKegiatanHarian(kegiatanHarianId, updateKegiatanHarianDto);
  }

  @Delete(':kegiatanId')
  remove(@Param('kegiatanId') kegiatanId: number) {
    return this.kegiatanHarianService.remove(kegiatanId);
  }
}
