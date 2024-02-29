import { Module } from '@nestjs/common';
import { PemilihanPenempatanController } from './pemilihan-penempatan.controller';
import { PemilihanPenempatanService } from './pemilihan-penempatan.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PemilihanPenempatanController],
  providers: [
    PemilihanPenempatanService,
    PrismaService
  ],
})
export class PemilihanPenempatanModule {}
