import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Query
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateMahasiswaDto } from 'src/generated/nestjs-dto/update-mahasiswa.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('mahasiswa')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Get()
  async getMahasiswa(@Query() params: any) {
    const data = await this.mahasiswaService.findAll(params);

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
    const response = await this.mahasiswaService.importExcel(files);

    return response;
  }

  @Put(':nim')
  update(@Param('nim') nim: string, @Body() updateMahasiswaDto: UpdateMahasiswaDto) {
    return this.mahasiswaService.update(nim, updateMahasiswaDto);
  }
}
