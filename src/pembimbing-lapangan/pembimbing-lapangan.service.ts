import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePembimbingLapanganDto } from 'src/generated/nestjs-dto/create-pembimbingLapangan.dto';
import { UpdatePembimbingLapanganDto } from 'src/generated/nestjs-dto/update-pembimbingLapangan.dto';
import * as bcrypt from 'bcrypt';
import { tr } from '@faker-js/faker';

@Injectable()
export class PembimbingLapanganService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPemlapBy(
    params: {
      nip: string,
      tahunAjaran: string,
    }
  ) {
    try {
      const data = await this.prisma.pembimbingLapangan.findMany({
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: true,
          satker: true,
        },
        where: {
          nip: params.nip,
          user: {
            tahunAjaran: {
              tahun: params.tahunAjaran,
            },
          },
        },
      });
  
      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Diambil',
        data: data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Gagal Diambil',
        error: error,
      };
    }
  }

  async create(createPembimbingLapangan: CreatePembimbingLapanganDto) {
    try {
      await this.prisma.pembimbingLapangan.findFirstOrThrow({
        where: {
          nip: createPembimbingLapangan.nip,
        },
      });
  
      const hashedPassword = await bcrypt.hash(createPembimbingLapangan.user.password, 10);
  
      const pembimbingLapanganBaru = await this.prisma.pembimbingLapangan.create({
        data: {
          nip: createPembimbingLapangan.nip,
          nama: createPembimbingLapangan.nama,
          user: {
            create: {
              email: createPembimbingLapangan.user.email,
              password: hashedPassword,
              tahunAjaran: {
                create: {
                  tahun: createPembimbingLapangan.user.tahunAjaran.tahun,
                },
              },
            },
          },
          satker: {
            connect: {
              satkerId: createPembimbingLapangan.satker.satkerId,
            },
          },
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: true,
          satker: true
        },
      });
  
      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Ditambahkan',
        data: pembimbingLapanganBaru,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Gagal Ditambahkan',
        error: error,
      };
    }
  }

  async update(
    pemlapId: number,
    updatePembimbingLapangan: UpdatePembimbingLapanganDto
  ) {
    try {
      await this.prisma.pembimbingLapangan.findFirstOrThrow({
        where: {
          pemlapId: pemlapId,
        },
      });

      // jika passwordnya di update lakukan hashing
      let hashedPassword = '';
      if (updatePembimbingLapangan.user.password) {
        hashedPassword = await bcrypt.hash(updatePembimbingLapangan.user.password, 10);
        updatePembimbingLapangan.user.password = hashedPassword;
      }

      const data  = await this.prisma.pembimbingLapangan.update({
        where: {
          pemlapId: pemlapId,
        },
        data: {
          nip: updatePembimbingLapangan.nip,
          nama: updatePembimbingLapangan.nama,
          user: {
            update: {
              email: updatePembimbingLapangan.user.email,
              password: hashedPassword,
            },
          }
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: true,
        },
      });

      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Diubah',
        data: data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Gagal Diubah',
        error: error,
      };
    }
  }

  async remove(pemlapId: number) {
    try {
      await this.prisma.pembimbingLapangan.findFirstOrThrow({
        where: {
          pemlapId: pemlapId,
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: true,
        },
      });
  
      await this.prisma.pembimbingLapangan.delete({
        where: {
          pemlapId: pemlapId,
        },
      });
  
      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Dihapus'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Gagal Dihapus',
        error: error,
      };
    }
  }
}
