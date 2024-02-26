import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Mahasiswa } from 'src/generated/nestjs-dto/mahasiswa.entity';

@ApiTags('mahasiswa')
@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Get()
  async findAll() {
    const data = await this.mahasiswaService.findAll();

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diambil',
      data: data,
    };
  }

  @Post('excel')
  @UseInterceptors(FilesInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async importExcel(@UploadedFiles() files: Array<Express.Multer.File>) {
    // console.log(files);
    const response = await this.mahasiswaService.importExcel(files);

    return response;
  }

  @Get(':nim')
  findOne(@Param('nim') nim: string) {
    return this.mahasiswaService.findOne(nim);
  }

  @Put(':nim')
  update(@Param('nim') nim: string, @Body() mahasiswa: Mahasiswa) {
    return this.mahasiswaService.update(nim, mahasiswa);
  }

  @Delete(':nim')
  remove(@Param('nim') nim: string) {
    return this.mahasiswaService.remove(nim);
  }
}
