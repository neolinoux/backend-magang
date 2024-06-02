import { Module } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { PresensiController } from './presensi.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [PresensiController],
  providers: [
    PresensiService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class PresensiModule {}
