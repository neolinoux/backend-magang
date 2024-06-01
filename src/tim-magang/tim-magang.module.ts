import { Module } from '@nestjs/common';
import { TimMagangService } from './tim-magang.service';
import { TimMagangController } from './tim-magang.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TimMagangController],
  providers: [
    TimMagangService,
    PrismaService,
  ]
})
export class TimMagangModule {}
