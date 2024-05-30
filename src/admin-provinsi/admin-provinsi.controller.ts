import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminProvinsiService } from './admin-provinsi.service';
import { CreateAdminProvinsiDto } from './dto/create-admin-provinsi.dto';
import { UpdateAdminProvinsiDto } from './dto/update-admin-provinsi.dto';

@Controller('admin-provinsi')
export class AdminProvinsiController {
  constructor(private readonly adminProvinsiService: AdminProvinsiService) {}

  @Post()
  create(@Body() createAdminProvinsiDto: CreateAdminProvinsiDto) {
    return this.adminProvinsiService.create(createAdminProvinsiDto);
  }

  @Get()
  findAll() {
    return this.adminProvinsiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminProvinsiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminProvinsiDto: UpdateAdminProvinsiDto) {
    return this.adminProvinsiService.update(+id, updateAdminProvinsiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminProvinsiService.remove(+id);
  }
}
