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
  async findAllSatkerBy(
    @Query() params: {
      kodeSatker: string;
      kodeProvinsi: string;
      kodeKabupatenKota: string;
      internalBPS: string;
    }
  ) {
    return this.satkerService.findAllSatkerBy(params);
  }

  @Post()
  create(
    @Body() satker: CreateSatkerDto
  ) {
    return this.satkerService.create(satker);
  }

  @Put(':satkerId')
  update(
    @Param('satkerId') satkerId: number,
    @Body() satker: UpdateSatkerDto
  ) {
    return this.satkerService.update(satkerId, satker);
  }

  @Delete(':satkerId')
  remove(
    @Param('satkerId') satkerId: number
  ) {
    return this.satkerService.remove(satkerId);
  }
}
