import { Module } from '@nestjs/common';
import { AdminProvinsiService } from './admin-provinsi.service';
import { AdminProvinsiController } from './admin-provinsi.controller';

@Module({
  controllers: [AdminProvinsiController],
  providers: [AdminProvinsiService]
})
export class AdminProvinsiModule {}
