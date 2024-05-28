import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { SatkerModule } from './satker/satker.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { KegiatanHarianModule } from './kegiatan-harian/kegiatan-harian.module';
import { KegiatanBulananModule } from './kegiatan-bulanan/kegiatan-bulanan.module';
import { BimbinganMagangModule } from './bimbingan-magang/bimbingan-magang.module';
import { PembimbingLapanganModule } from './pembimbing-lapangan/pembimbing-lapangan.module';
import { PemilihanPenempatanModule } from './pemilihan-penempatan/pemilihan-penempatan.module';
import { PemilihanPenempatanService } from './pemilihan-penempatan/pemilihan-penempatan.service';
import { PemilihanPenempatanController } from './pemilihan-penempatan/pemilihan-penempatan.controller';
import { DosenPembimbingMagangModule } from './dosen-pembimbing-magang/dosen-pembimbing-magang.module';
import { PresensiModule } from './presensi/presensi.module';

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
    BimbinganMagangModule,
    KegiatanHarianModule,
    KegiatanBulananModule,
    PresensiModule
  ],
  controllers: [AppController, PemilihanPenempatanController],
  providers: [AppService, PrismaService, PemilihanPenempatanService],
})
export class AppModule{}
