import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UpdateMahasiswaDto } from 'src/generated/nestjs-dto/update-mahasiswa.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import * as XLSX from 'xlsx';
import { CreateMahasiswaDto } from 'src/generated/nestjs-dto/create-mahasiswa.dto';
import { da } from '@faker-js/faker';

@ApiTags('mahasiswa')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Get()
  async getMahasiswa(
    @Query() params: {
      nim: string;
      nama: string;
      kelas: string;
      prodi: string;
      nipDosen: string;
      nipPemlap: string;
      kodeSatker: string;
      email: string;
      tahunAjaran: string;
    }
  ) {
    const data = await this.mahasiswaService.findAll(params);

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diambil',
      data: data,
    };
  }

  @Post('excel')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async importExcel(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new Error('File harus berformat xlsx');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return this.mahasiswaService.importExcel(data);
  }

  @Put(':mahasiswaId')
  update(
    @Param('mahasiswaId') mahasiswaId: number,
    @Body() updateMahasiswaDto: UpdateMahasiswaDto
  ) {
    return this.mahasiswaService.update(+mahasiswaId, updateMahasiswaDto);
  }
}
