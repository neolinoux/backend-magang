import { Module } from '@nestjs/common';
import { AdminProvinsiService } from './admin-provinsi.service';
import { AdminProvinsiController } from './admin-provinsi.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AdminProvinsiController],
  providers: [
    AdminProvinsiService,
    PrismaService,
    CaslAbilityFactory,
    JwtService
  ]
})
export class AdminProvinsiModule {}
