import { KegiatanBulananService } from './kegiatan-bulanan.service';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/create-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/update-rekapKegiatanBulanan.dto';

@ApiTags('Kegiatan Bulanan')
@ApiBearerAuth()
@ApiTags('Bimbingan Magang')
@Controller('kegiatan-bulanan')
export class KegiatanBulananController {
  constructor(private readonly kegiatanBulananService: KegiatanBulananService) {}

  @Post()
  create(@Body() createRekapKegiatanBulananDto: CreateRekapKegiatanBulananDto) {
    return this.kegiatanBulananService.create(createRekapKegiatanBulananDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.kegiatanBulananService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto) {
    return this.kegiatanBulananService.update(+id, updateRekapKegiatanBulananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanBulananService.remove(+id);
  }
}
