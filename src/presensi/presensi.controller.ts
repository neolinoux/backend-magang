import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { CreatePresensiDto } from 'src/generated/nestjs-dto/create-presensi.dto';
import { UpdatePresensiDto } from 'src/generated/nestjs-dto/update-presensi.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('presensi')
@ApiTags('presensi')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PresensiController {
  constructor(private readonly presensiService: PresensiService) {}

  @Post('datang/:mahasiswaId')
  presensiDatang(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() createPresensiDto: CreatePresensiDto
  ) {
    return this.presensiService.presensiDatang(+mahasiswaId, createPresensiDto);
  }

  @Put('pulang/:presensiId')
  presensiPulang(
    @Param('presensiId') presensiId: number,
    @Body() updatePresensiDto: UpdatePresensiDto
  ) {
    return this.presensiService.presensiPulang(+presensiId, updatePresensiDto);
  }

  @Get()
  findAllPresensiBy(
    @Query() params: {
      tanggal: string,
      mahasiswaId: number,
    },
  ) {
    return this.presensiService.findAllPresensiBy(params);
  }

  @Delete(':presensiId')
  remove(@Param('presensiId') presensiId: number) {
    return this.presensiService.remove(+presensiId);
  }
}
