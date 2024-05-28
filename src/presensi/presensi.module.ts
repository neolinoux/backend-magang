import { Module } from '@nestjs/common';
import { PresensiService } from './presensi.service';
import { PresensiController } from './presensi.controller';

@Module({
  controllers: [PresensiController],
  providers: [PresensiService]
})
export class PresensiModule {}
