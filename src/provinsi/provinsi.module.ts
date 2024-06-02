import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [ProvinsiController],
  providers: [
    ProvinsiService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class ProvinsiModule {}
