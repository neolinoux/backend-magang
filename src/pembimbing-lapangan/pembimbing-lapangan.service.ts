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
            userRoles: {
              create: {
                roleId: 4,
              },
            },
          },
        },
        satker: {
          connect: {
            kodeSatker: createPembimbingLapangan.satker.kodeSatker,
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
    const data = await this.prisma.pembimbingLapangan.update({
      where: {
        pemlapId: pemlapId,
      },
      data: {
        nip: updatePembimbingLapangan.nip || undefined,
        nama: updatePembimbingLapangan.nama || undefined,
        user: {
          update: {
            email: updatePembimbingLapangan.email || undefined,
          },
        }
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Diubah',
      data: data,
    };
  }

  async remove(pemlapId: number) {
    await this.prisma.pembimbingLapangan.delete({
      where: {
        pemlapId: pemlapId,
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Dihapus'
    };
  }
}
