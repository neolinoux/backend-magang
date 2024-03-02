import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { DosenPembimbingMagangModule } from './dosen-pembimbing-magang/dosen-pembimbing-magang.module';
import { PembimbingLapanganModule } from './pembimbing-lapangan/pembimbing-lapangan.module';
import { SatkerModule } from './satker/satker.module';
import { PemilihanPenempatanController } from './pemilihan-penempatan/pemilihan-penempatan.controller';
import { PemilihanPenempatanService } from './pemilihan-penempatan/pemilihan-penempatan.service';
import { PemilihanPenempatanModule } from './pemilihan-penempatan/pemilihan-penempatan.module';
import { BimbinganMagangModule } from './bimbingan-magang/bimbingan-magang.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    UsersModule,
    AuthModule,
    PrismaModule,
    JwtModule,
    PassportModule,
    MahasiswaModule,
    DosenPembimbingMagangModule,
    PembimbingLapanganModule,
    SatkerModule,
    PemilihanPenempatanModule,
    BimbinganMagangModule
  ],
  controllers: [AppController, PemilihanPenempatanController],
  providers: [AppService, PrismaService, PemilihanPenempatanService],
})
export class AppModule{}
