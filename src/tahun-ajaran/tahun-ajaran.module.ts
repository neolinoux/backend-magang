import { Module } from '@nestjs/common';
import { TahunAjaranService } from './tahun-ajaran.service';
import { TahunAjaranController } from './tahun-ajaran.controller';

@Module({
  controllers: [TahunAjaranController],
  providers: [TahunAjaranService]
})
export class TahunAjaranModule {}
