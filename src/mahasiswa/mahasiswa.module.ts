import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaController } from './mahasiswa.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MahasiswaController],
  providers: [
    MahasiswaService,
    PrismaService,
    CaslAbilityFactory,
    JwtService
  ]
})
export class MahasiswaModule {}
