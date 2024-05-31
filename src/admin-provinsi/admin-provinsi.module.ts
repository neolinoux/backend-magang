import { Module } from '@nestjs/common';
import { AdminProvinsiService } from './admin-provinsi.service';
import { AdminProvinsiController } from './admin-provinsi.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminProvinsiController],
  providers: [
    AdminProvinsiService,
    PrismaService
  ]
})
export class AdminProvinsiModule {}
