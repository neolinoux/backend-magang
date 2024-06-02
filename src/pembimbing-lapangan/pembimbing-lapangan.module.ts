import { Module } from '@nestjs/common';
import { PembimbingLapanganService } from './pembimbing-lapangan.service';
import { PembimbingLapanganController } from './pembimbing-lapangan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [PembimbingLapanganController],
  providers: [
    PembimbingLapanganService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class PembimbingLapanganModule {}
