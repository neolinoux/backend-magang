import { Module } from '@nestjs/common';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';
import { PembimbingLapanganController } from './pembimbing-lapangan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PembimbingLapanganController],
  providers: [PembimbingLapanganService, PrismaService]
})
export class PembimbingLapanganModule {}
