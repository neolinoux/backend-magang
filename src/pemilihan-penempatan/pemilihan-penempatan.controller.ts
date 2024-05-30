import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PemilihanPenempatanService } from './pemilihan-penempatan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
    @Body() pilihanFinal: [
      satkerId: number,
    ]
  ) {
    return this.pemilihanPenempatanService.confirmPemilihanPenempatan(pilihanId, pilihanFinal);
  }

  @Put('/e/:mahasiswaId')
  async pindahPemilihanPenempatan(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() pilihan: [
      satkerId1: number,
      satkerId2: number,
      satkerId3: number,
    ]
  ) {
    return this.pemilihanPenempatanService.pindahPemilihanPenempatan(mahasiswaId, pilihan);
  }

  @Post(':mahasiswaId')
  async createPemilihanPenempatan(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() pilihan: [
      satkerId1: number,
      satkerId2: number,
      satkerId3: number,
    ]
  ) {
    return this.pemilihanPenempatanService.createPemilihanPenempatan(mahasiswaId, pilihan);
  }

  @Delete(':pilihanId')
  async deletePemilihanPenempatan(
    @Param('pilihanId') pilihanId: number
  ) {
    return this.pemilihanPenempatanService.deletePemilihanPenempatan(pilihanId);
  }
}
