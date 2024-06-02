import { Module } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { SatkerController } from './satker.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [SatkerController],
  providers: [
    SatkerService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class SatkerModule {}
