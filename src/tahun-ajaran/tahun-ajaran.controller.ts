import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { TahunAjaranService } from './tahun-ajaran.service';
import { CreateTahunAjaranDto } from 'src/generated/nestjs-dto/create-tahunAjaran.dto';
import { UpdateTahunAjaranDto } from 'src/generated/nestjs-dto/update-tahunAjaran.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tahun Ajaran')
@Controller('tahun-ajaran')
export class TahunAjaranController {
  constructor(private readonly tahunAjaranService: TahunAjaranService) {}

  @Post()
  create(@Body() createTahunAjaranDto: CreateTahunAjaranDto) {
    return this.tahunAjaranService.create(createTahunAjaranDto);
  }

  @Get()
  findAll(
    @Query() params: {
      tahun: string;
    }
  ) {
    return this.tahunAjaranService.findAllBy(params);
  }

  @Put('set-active/:tahunAjaranId')
  update(
    @Param('tahunAjaranId') tahunAjaranId: number
  ) {
    return this.tahunAjaranService.update(+tahunAjaranId);
  }

  @Delete(':tahunAjaranId')
  remove(@Param('tahunAjaranId') tahunAjaranId: number) {
    return this.tahunAjaranService.remove(+tahunAjaranId);
  }
}
