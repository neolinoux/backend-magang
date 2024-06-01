import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PemilihanPenempatanService } from './pemilihan-penempatan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';

@ApiTags('Pemilihan Penempatan')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('pemilihan-penempatan')
export class PemilihanPenempatanController {
  constructor(private pemilihanPenempatanService: PemilihanPenempatanService) { }
  
  @Get()
  async findAllPemilihanPenempatanBy(
    @Query() params: {
      satkerId: number,
      mahasiswaId: number
    }
  ) {
    return this.pemilihanPenempatanService.findAllPemilihanPenempatanBy(params);
  }

  @Put(':pilihanId')
  async confirmPemilihanPenempatan(
    @Param('pilihanId') pilihanId: number,
    @Body() pilihanFinal: Satker
  ) {
    return this.pemilihanPenempatanService.confirmPemilihanPenempatan(pilihanId, pilihanFinal);
  }

  @Post(':mahasiswaId')
  async createPemilihanPenempatan(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() pilihan: Satker[]
  ) {
    return this.pemilihanPenempatanService.createPemilihanPenempatan(+mahasiswaId, pilihan);
  }

  @Put('/e/:pilihanId')
  async pindahPemilihanPenempatan(
    @Param('pilihanId') pilihanId: number,
    @Body() pilihan: Satker
  ) {
    return this.pemilihanPenempatanService.pindahPemilihanPenempatan(pilihanId, pilihan);
  }

  @Delete(':pilihanId')
  async deletePemilihanPenempatan(
    @Param('pilihanId') pilihanId: number
  ) {
    return this.pemilihanPenempatanService.deletePemilihanPenempatan(+pilihanId);
  }
}
