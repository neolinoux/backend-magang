import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';

@ApiTags('Satker')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('satker')
export class SatkerController {
  constructor(private readonly satkerService: SatkerService) {}

  @Get()
  async findAllSatkerBy(@Query() params: any) {
    return this.satkerService.findAllSatkerBy(params);
  }

  @Post()
  create(@Body() satker: CreateSatkerDto) {
    return this.satkerService.create(satker);
  }

  @Put(':kode')
  update(@Param('kode') kode: string, @Body() satker: UpdateSatkerDto) {
    return this.satkerService.update(kode, satker);
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    return this.satkerService.remove(kode);
  }
}
