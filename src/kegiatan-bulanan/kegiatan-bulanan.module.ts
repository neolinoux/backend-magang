import { Module } from '@nestjs/common';
import { KegiatanBulananService } from './kegiatan-bulanan.service';
import { KegiatanBulananController } from './kegiatan-bulanan.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KegiatanBulananController],
  providers: [KegiatanBulananService, JwtService, PrismaService]
})
export class KegiatanBulananModule {}
