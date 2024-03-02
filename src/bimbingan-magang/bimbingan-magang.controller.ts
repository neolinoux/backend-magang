import { Controller, Get, Post, Body, Param, Req, Put, Query } from '@nestjs/common';
import { BimbinganMagangService } from './bimbingan-magang.service';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';

@Controller('bimbingan-magang')
export class BimbinganMagangController {
  constructor(
    private readonly bimbinganMagangService: BimbinganMagangService,
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
  findAllBimbinganMagangDosenPembimbingBy(@Param('nip') nip: string,@Query() query: any) {
    return this.bimbinganMagangService.findAllBimbinganMagangDosenPembimbingBy(nip, query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBimbinganMagangDto: UpdateBimbinganMagangDto, @Req() req: any){
    return this.bimbinganMagangService.update(+id, updateBimbinganMagangDto, req);
  }

  @Put('confirm/:id')
  confirm(@Param('id') id: string, @Req() req: any){
    return this.bimbinganMagangService.confirm(+id, req);
  }
}
