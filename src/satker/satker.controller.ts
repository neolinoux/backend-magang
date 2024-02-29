import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Satker')
@Controller('satker')
export class SatkerController {
  constructor(private readonly satkerService: SatkerService) {}

  @Get()
  async findAllSatkerBy(@Query() params: any) {
    return this.satkerService.findAllSatkerBy(params);
  }

  @Post()
  create(@Body() satker: Satker) {
    return this.satkerService.create(satker);
  }

  @Patch(':kode')
  update(@Param('kode') kode: string, @Body() satker: Satker) {
    return this.satkerService.update(kode, satker);
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    return this.satkerService.remove(kode);
  }
}
