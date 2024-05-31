import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { AdminProvinsiService } from './admin-provinsi.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAdminProvinsiDto } from 'src/generated/nestjs-dto/create-adminProvinsi.dto';
import { UpdateAdminProvinsiDto } from 'src/generated/nestjs-dto/update-adminProvinsi.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin-provinsi')
export class AdminProvinsiController {
  constructor(private readonly adminProvinsiService: AdminProvinsiService) {}

  @Post()
  create(
    @Body() createAdminProvinsiDto: CreateAdminProvinsiDto
  ) {
    return this.adminProvinsiService.create(createAdminProvinsiDto);
  }

  @Get()
  findAllAdminProvinsiBy(
    @Query() params: {
      email: string;
      namaProvinsi: string;
      kodeProvinsi: string;
    }
  ) {
    return this.adminProvinsiService.findAllAdminProvinsiBy(params);
  }

  @Put(':adminProvinsiId')
  update(
    @Param('adminProvinsiId') adminProvinsiId: string,
    @Body() updateAdminProvinsiDto: UpdateAdminProvinsiDto
  ) {
    return this.adminProvinsiService.update(+adminProvinsiId, updateAdminProvinsiDto);
  }

  @Delete(':adminProvinsiId')
  remove(@Param('adminProvinsiId') adminProvinsiId: number) {
    return this.adminProvinsiService.remove(+adminProvinsiId);
  }
}
