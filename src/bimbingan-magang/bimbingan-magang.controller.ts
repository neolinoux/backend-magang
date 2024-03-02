import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BimbinganMagangService } from './bimbingan-magang.service';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('bimbingan-magang')
export class BimbinganMagangController {
  constructor(
    private readonly bimbinganMagangService: BimbinganMagangService,
    private readonly jwtService: JwtService
  ) { }

  @Post()
  create(@Body() createBimbinganMagangDto: CreateBimbinganMagangDto, @Req() req: any) {
    return this.bimbinganMagangService.create(createBimbinganMagangDto, req);
  }

  @Get('mahasiswa/:nim')
  findAllBimbinganMagangMahasiswaBy(@Param('nim') nim: string) {
    return this.bimbinganMagangService.findAllBimbinganMagangMahasiswaBy(nim);
  }

  @Get('dosen-pembimbing/:nip')
  findAllBimbinganMagangDosenPembimbingBy(@Param('nip') nip: string) {
    return this.bimbinganMagangService.findAllBimbinganMagangDosenPembimbingBy(nip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bimbinganMagangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBimbinganMagangDto: UpdateBimbinganMagangDto) {
    return this.bimbinganMagangService.update(+id, updateBimbinganMagangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bimbinganMagangService.remove(+id);
  }
}
