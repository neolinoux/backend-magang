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
  async findAllPemilihanPenempatanBy(@Query() params: any){
    return this.pemilihanPenempatanService.findAllPemilihanPenempatanBy(params);
  }

  @Put(':id')
  async confirmPemilihanPenempatan(@Param('id') id: number, @Body() body: any){
    return this.pemilihanPenempatanService.confirmPemilihanPenempatan(id, body);
  }

  @Put('/e/:id')
  async pindahPemilihanPenempatan(@Param('id') id: string, @Body() body: any){
    return this.pemilihanPenempatanService.pindahPemilihanPenempatan(id, body);
  }

  @Post()
  async createPemilihanPenempatan(@Body() body: any) {
    return this.pemilihanPenempatanService.createPemilihanPenempatan(body);
  }

  @Delete(':id')
  async deletePemilihanPenempatan(@Param('id') id: string) {
    return this.pemilihanPenempatanService.deletePemilihanPenempatan(id);
  }
}
