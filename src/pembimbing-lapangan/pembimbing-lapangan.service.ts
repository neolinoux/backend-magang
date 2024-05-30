import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePembimbingLapanganDto } from 'src/generated/nestjs-dto/create-pembimbingLapangan.dto';
import { UpdatePembimbingLapanganDto } from 'src/generated/nestjs-dto/update-pembimbingLapangan.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PembimbingLapanganService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPemlapBy(
    params: {
      nip: string,
      tahunAjaran: string,
    }
  ) {
    const data = await this.prisma.pembimbingLapangan.findMany({
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
  }

  async create(createPembimbingLapangan: CreatePembimbingLapanganDto) {
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
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                })).tahunAjaranId
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
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Ditambahkan',
      data: pembimbingLapanganBaru,
    };
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
