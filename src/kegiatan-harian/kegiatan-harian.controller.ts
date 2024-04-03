import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put } from '@nestjs/common';
import { KegiatanHarianService } from './kegiatan-harian.service';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { TipeKegiatan } from 'src/generated/nestjs-dto/tipeKegiatan.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Kegiatan Harian')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('kegiatan-harian')
export class KegiatanHarianController {
  constructor(private readonly kegiatanHarianService: KegiatanHarianService) {}

  @Post()
  createKegiatanHarian(@Body() createKegiatanHarian: CreateKegiatanHarianDto, @Req() req: any){
    return this.kegiatanHarianService.createKegiatanHarian(createKegiatanHarian, req)
  }

  @Post('tipe-kegiatan/:nim')
  create(@Body() tipeKegiatan: TipeKegiatan, @Param('nim') nim: string) {
    return this.kegiatanHarianService.create(tipeKegiatan, nim);
  }

  @Get('mahasiswa/:nim')
  findAllKegiatanHarianMahasiswa(@Param('nim') nim: string, @Query() params: any){
    return this.kegiatanHarianService.findAllKegiatanHarianMahasiswa(nim, params);
  }

  @Get('pembimbing-lapangan/:nip')
  findAllKegiatanHarianPembimbingLapangan(@Param('nip') nip: string, @Query() params: any){
    return this.kegiatanHarianService.findAllKegiatanHarianPembimbingLapangan(nip, params);
  }

  @Get('dosen-pembimbing/:nip')
  findAllKegiatanHarianDosenPembimbing(@Param('nip') nip: string, @Query() params: any){
    return this.kegiatanHarianService.findAllKegiatanHarianDosenPembimbing(nip, params);
  }

  @Get('tipe-kegiatan')
  findAllTipeKegiatan(@Query() params: any){
    return this.kegiatanHarianService.findAllTipeKegiatan(params);
  }

  @Put('konfirmasi/:nim/:id')
  konfirmasiKegiatanHarian(
    @Param('nim') nim: string,
    @Param('id') id: string,
    @Body() konfirmasi: any
  ) {
    return this.kegiatanHarianService.konfirmasiKegiatanHarian(nim, +id, konfirmasi);
  }

  @Put(':nim/:id')
  updateKegiatanHarian(
    @Param('nim') nim: string,
    @Param('id') id: string,
    @Body() updateKegiatanHarianDto: UpdateKegiatanHarianDto) {
    return this.kegiatanHarianService.updateKegiatanHarian(nim, +id, updateKegiatanHarianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanHarianService.remove(+id);
  }
}
