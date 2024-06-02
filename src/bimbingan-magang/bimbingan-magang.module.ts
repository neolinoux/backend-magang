import { Module } from '@nestjs/common';
import { BimbinganMagangService } from './bimbingan-magang.service';
import { BimbinganMagangController } from './bimbingan-magang.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [BimbinganMagangController],
  providers: [
    BimbinganMagangService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class BimbinganMagangModule {}
