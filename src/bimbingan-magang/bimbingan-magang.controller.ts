import { Controller, Get, Post, Body, Param, Req, Put, Query, UseGuards } from '@nestjs/common';
import { BimbinganMagangService } from './bimbingan-magang.service';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('bimbingan-magang')
export class BimbinganMagangController {
  constructor(
    private readonly bimbinganMagangService: BimbinganMagangService,
  ) { }

  @Post('mahasiswa/:mahasiswaId')
  createByMahasiswa(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() createBimbinganMagangDto: CreateBimbinganMagangDto
  ) {
    return this.bimbinganMagangService.createByMahasiswa(mahasiswaId, createBimbinganMagangDto);
  }

  @Post('dosen-pembimbing/:dosenId')
  createByDosen(
    @Param('dosenId') dosenId: number,
    @Body() createBimbinganMagangDto: CreateBimbinganMagangDto
  ) {
    return this.bimbinganMagangService.createByDosenPembimbing(dosenId, createBimbinganMagangDto);
  }

  @Get()
  findAllBimbinganMagangMahasiswaBy(
    @Query() query: {
      mahasiswaId: number;
      dosenId: number;
      tanggal: Date;
      status: string;
    }
  ) {
    return this.bimbinganMagangService.findAllBimbinganMagangBy(query);
  }

  @Put(':bimbinganId')
  update(
    @Param('bimbinganId') bimbinganId: number,
    @Body() updateBimbinganMagangDto: UpdateBimbinganMagangDto,
  ) {
    return this.bimbinganMagangService.update(bimbinganId, updateBimbinganMagangDto);
  }

  @Put('confirm/:bimbinganId')
  confirm(
    @Param('bimbinganId') bimbinganId: number
  ) {
    return this.bimbinganMagangService.confirm(bimbinganId);
  }
}
