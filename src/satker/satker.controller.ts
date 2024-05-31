import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { CreateKapasitasSatkerTahunAjaranDto } from 'src/generated/nestjs-dto/create-kapasitasSatkerTahunAjaran.dto';

@ApiTags('Satker')
@ApiBearerAuth()
@Controller('satker')
export class SatkerController {
  constructor(private readonly satkerService: SatkerService) {}

  @Get()
  async findAllSatkerBy(
    @Query() params: {
      kodeSatker: string;
      namaProvinsi: string;
      kodeProvinsi: string;
      namaKabupatenKota: string;
      kodeKabupatenKota: string;
      alamat: string;
      internalBPS: string;
    }
  ) {
    return this.satkerService.findAllSatkerBy(params);
  }

  @Post('bulk')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  createBulk(
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new Error('File harus berformat xlsx');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return this.satkerService.createBulk(data);
  }

  @Post()
  create(
    @Body() satker: CreateSatkerDto
  ) {
    return this.satkerService.create(satker);
  }

  @Post('kapasitas-satker/bulk')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  createBulkKapasitasSatker(
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new Error('File harus berformat xlsx');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return this.satkerService.createBulkKapasitasSatker(data);
  }

  @Post('kapasitas-satker')
  createKapasitasSatker(
    @Body() kapasitasSatker: CreateKapasitasSatkerTahunAjaranDto
  ) {
    return this.satkerService.createKapasitasSatker(kapasitasSatker);
  }

  @Get('kapasitas-satker')
  async findAllKapasitasSatkerBy(
    @Query() params: {
      kodeSatker: string;
      namaProvinsi: string;
      kodeProvinsi: string;
      namaKabupatenKota: string;
      kodeKabupatenKota: string;
      tahunAjaran: string;
    }
  ) {
    return this.satkerService.findAllKapasitasSatkerBy(params);
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
