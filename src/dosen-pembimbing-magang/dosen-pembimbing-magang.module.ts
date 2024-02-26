import { Module } from '@nestjs/common';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';
import { DosenPembimbingMagangController } from './dosen-pembimbing-magang.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DosenPembimbingMagangController],
  providers: [DosenPembimbingMagangService, PrismaService]
})
export class DosenPembimbingMagangModule {}
