import { Module } from '@nestjs/common';
import { SatkerService } from './satker.service';
import { SatkerController } from './satker.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SatkerController],
  providers: [SatkerService, PrismaService]
})
export class SatkerModule {}
