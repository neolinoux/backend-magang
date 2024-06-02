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
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/create-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/update-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananTipeKegiatan } from 'src/generated/nestjs-dto/update-rekapKegiatanBulananTipeKegiatan.dto';

@ApiBearerAuth()
@ApiTags('Kegiatan Bulanan')
@Controller('kegiatan-bulanan')
export class KegiatanBulananController {
  constructor(private readonly kegiatanBulananService: KegiatanBulananService) {}

  @Post(':mahasiswaId')
  create(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() createRekapKegiatanBulananDto: CreateRekapKegiatanBulananDto
  ) {
    return this.kegiatanBulananService.create(+mahasiswaId, createRekapKegiatanBulananDto);
  }

  @Get()
  findAll(
    @Query() query: {
      mahasiswaId?: number;
      tanggalAwal?: string;
      tanggalAkhir?: string;
    }) {
    return this.kegiatanBulananService.findAllRekapKegiatanBulananBy(query);
  }

  @Put(':rekapId')
  updateStatusRekapKegiatanBulanan(
    @Param('rekapId') rekapId: number,
    @Body() updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto
  ) {
    return this.kegiatanBulananService.updateStatusRekapKegiatanBulanan(+rekapId, updateRekapKegiatanBulananDto);
  }

  @Put('edit-detail/:rekapTipeKegiatanId')
  updateDetailRekapKegiatan(
    @Param('rekapTipeKegiatanId') rekapTipeKegiatanId: number,
    @Body() updateRekapKegiatanBulananTipeKegiatan: UpdateRekapKegiatanBulananTipeKegiatan
  ) {
    return this.kegiatanBulananService.updateDetailRekapKegiatan(+rekapTipeKegiatanId, updateRekapKegiatanBulananTipeKegiatan);
  }

  @Delete(':rekapId')
  remove(@Param('rekapId') rekapId: number) {
    return this.kegiatanBulananService.remove(+rekapId);
  }
}
