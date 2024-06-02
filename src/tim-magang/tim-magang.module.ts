import { Module } from '@nestjs/common';
import { TimMagangService } from './tim-magang.service';
import { TimMagangController } from './tim-magang.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [TimMagangController],
  providers: [
    TimMagangService,
    PrismaService,
    JwtService,
    CaslAbilityFactory
  ]
})
export class TimMagangModule {}
