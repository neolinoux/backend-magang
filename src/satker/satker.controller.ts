import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';

@Controller('satker')
export class SatkerController {
  constructor(private readonly satkerService: SatkerService) {}

  @Post()
  create(@Body() satker: Satker) {
    return this.satkerService.create(satker);
  }

  @Get()
  findAll() {
    return this.satkerService.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    return this.satkerService.findOne(kode);
  }

  @Patch(':kode')
  update(@Param('kode') kode: string, @Body() satker: Satker) {
    return this.satkerService.update(kode, satker);
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    return this.satkerService.remove(kode);
  }

  @Get('provinsi/:kodeProvinsi')
  findByProvinsi(@Param('kodeProvinsi') kodeProvinsi: string) {
    return this.satkerService.findByProvinsi(kodeProvinsi);
  }

}
