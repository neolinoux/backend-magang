import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';
import { DosenPembimbingMagang } from 'src/generated/nestjs-dto/dosenPembimbingMagang.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/create-dosenPembimbingMagang.dto';
import { UpdateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/update-dosenPembimbingMagang.dto';

@ApiTags('Dosen Pembimbing Magang')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dosen-pembimbing')
export class DosenPembimbingMagangController {
  constructor(
    private readonly dosenPembimbingMagangService: DosenPembimbingMagangService,
    private jwtService: JwtService
  ) { }

  @Get()
  async findAllDosenBy(@Query() params: any){
    return this.dosenPembimbingMagangService.findAllDosenBy(params);
  }

  @Post()
  async addDosenPembimbingMagang(@Body() createDosenPembimbingMagang: CreateDosenPembimbingMagangDto) {
    return this.dosenPembimbingMagangService.create(createDosenPembimbingMagang);
  }
  
  @Put(':nip')
  async update(@Param('nip') nip: string, @Body() updateDosenPembimbingMagang: UpdateDosenPembimbingMagangDto) {
    return this.dosenPembimbingMagangService.update(nip, updateDosenPembimbingMagang);
  }
}
