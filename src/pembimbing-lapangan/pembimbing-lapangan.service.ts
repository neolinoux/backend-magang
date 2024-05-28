import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePembimbingLapanganDto } from 'src/generated/nestjs-dto/create-pembimbingLapangan.dto';
import { UpdatePembimbingLapanganDto } from 'src/generated/nestjs-dto/update-pembimbingLapangan.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PembimbingLapanganService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPemlapBy(params: any) {
    try {
      const allPembimbingLapangan = await this.prisma.pembimbingLapangan.findMany({
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: {
            select: {
              email: true,
            },
          },
          tahunAjaranPemlap: {
            select: {
              tahunAjaran: {
                select: {
                  tahun: true,
                },
              },
            },
          },
        },
        where: {
          nip: params.nip,
          tahunAjaranPemlap: {
            some: {
              tahunAjaran: {
                tahun: params.tahun,
              },
            },
          },
        },
      });
  
      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Diambil',
        data: allPembimbingLapangan,
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
      const cekPembimbingLapangan = await this.prisma.pembimbingLapangan.findUnique({
        where: {
          nip: createPembimbingLapangan.nip,
        },
      });
  
      if (cekPembimbingLapangan) {
        return {
          status: 'error',
          message: 'Data Pembimbing Lapangan Sudah Ada',
        };
      }
  
      const hashedPassword = await bcrypt.hash(createPembimbingLapangan.user.password, 10);
  
      const pembimbingLapanganBaru = await this.prisma.pembimbingLapangan.create({
        data: {
          nip: createPembimbingLapangan.nip,
          nama: createPembimbingLapangan.nama,
          user: {
            create: {
              email: createPembimbingLapangan.user.email,
              password: hashedPassword,
            },
          },
          tahunAjaranPemlap: {
            create: {
              tahunAjaran: {
                connect: {
                  tahun: createPembimbingLapangan.tahunAjaranPemlap.tahunAjaran.tahun,
                },
              },
            },
          },
          satker: {
            connect: {
              kode: createPembimbingLapangan.satker.kode,
            },
          },
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: {
            select: {
              email: true,
            },
          },
          tahunAjaranPemlap: {
            select: {
              tahunAjaran: {
                select: {
                  tahun: true,
                },
              },
            },
          },
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

  async update(nip: string, updatePembimbingLapangan: UpdatePembimbingLapanganDto) {
    try {
      const cekPembimbingLapangan = await this.prisma.pembimbingLapangan.findUnique({
        where: {
          nip: nip,
        },
      });
  
      if (!cekPembimbingLapangan) {
        return {
          status: 'error',
          message: 'Data Pembimbing Lapangan Tidak Ditemukan',
        };
      }

      let hashedPassword = '';
      if (updatePembimbingLapangan.user.password) {
        hashedPassword = await bcrypt.hash(updatePembimbingLapangan.user.password, 10);
        updatePembimbingLapangan.user.password = hashedPassword;
      }

      const data  = await this.prisma.pembimbingLapangan.update({
        where: {
          nip: nip,
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
          user: {
            select: {
              email: true,
            },
          },
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

  async remove(nip: string) {
    try {
      const pemimbingLapangan = await this.prisma.pembimbingLapangan.findUnique({
        where: {
          nip: nip,
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: {
            select: {
              email: true,
            },
          },
          tahunAjaranPemlap: {
            select: {
              tahunAjaran: {
                select: {
                  tahun: true,
                },
              },
            },
          },
        },
      });
  
      if(!pemimbingLapangan){
        return {
          status: 'error',
          message: 'Data Pembimbing Lapangan Tidak Ditemukan',
        };
      }
  
      await this.prisma.pembimbingLapangan.delete({
        where: {
          nip: nip,
        },
      });
  
      return {
        status: 'success',
        message: 'Data Pembimbing Lapangan Berhasil Dihapus',
        data: pemimbingLapangan,
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
