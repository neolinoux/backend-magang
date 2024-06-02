import { Module } from '@nestjs/common';
import { DosenPembimbingMagangService } from './dosen-pembimbing-magang.service';
import { DosenPembimbingMagangController } from './dosen-pembimbing-magang.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [DosenPembimbingMagangController],
  providers: [
    DosenPembimbingMagangService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class DosenPembimbingMagangModule {}
