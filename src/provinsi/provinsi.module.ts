import { Module } from '@nestjs/common';
import { ProvinsiService } from './provinsi.service';
import { ProvinsiController } from './provinsi.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProvinsiController],
  providers: [
    ProvinsiService,
    PrismaService
  ]
})
export class ProvinsiModule {}
