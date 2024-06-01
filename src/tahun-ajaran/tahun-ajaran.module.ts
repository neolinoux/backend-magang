import { Module } from '@nestjs/common';
import { TahunAjaranService } from './tahun-ajaran.service';
import { TahunAjaranController } from './tahun-ajaran.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TahunAjaranController],
  providers: [
    TahunAjaranService,
    PrismaService
  ]
    
})
export class TahunAjaranModule {}
