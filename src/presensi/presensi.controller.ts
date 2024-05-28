import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { CreatePresensiDto } from './dto/create-presensi.dto';
import { UpdatePresensiDto } from './dto/update-presensi.dto';

@Controller('presensi')
export class PresensiController {
  constructor(private readonly presensiService: PresensiService) {}

  @Post()
  create(@Body() createPresensiDto: CreatePresensiDto) {
    return this.presensiService.create(createPresensiDto);
  }

  @Get()
  findAll() {
    return this.presensiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presensiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresensiDto: UpdatePresensiDto) {
    return this.presensiService.update(+id, updatePresensiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presensiService.remove(+id);
  }
}
