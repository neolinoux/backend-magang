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
    PembimbingLapanganModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule{}
