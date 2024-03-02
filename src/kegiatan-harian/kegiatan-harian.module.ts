import { Module } from '@nestjs/common';
import { KegiatanHarianService } from './kegiatan-harian.service';
import { KegiatanHarianController } from './kegiatan-harian.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KegiatanHarianController],
  providers: [KegiatanHarianService, JwtService, PrismaService]
})
export class KegiatanHarianModule {}
