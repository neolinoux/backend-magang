import { Injectable } from '@nestjs/common';
import { PembimbingLapangan } from 'src/generated/nestjs-dto/pembimbingLapangan.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PembimbingLapanganService {
  constructor(private readonly prisma: PrismaService) {}

  async create(pembimbingLapangan: PembimbingLapangan) {
    const cekPembimbingLapangan = await this.prisma.pembimbingLapangan.findUnique({
      where: {
        nip: pembimbingLapangan.nip,
      },
    });

    if (cekPembimbingLapangan) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Sudah Ada',
      };
    }

    const hashedPassword = await bcrypt.hash(pembimbingLapangan.user.password, 10);

    const dosenBaru = await this.prisma.pembimbingLapangan.create({
      data: {
        nip: pembimbingLapangan.nip,
        nama: pembimbingLapangan.nama,
        user: {
          create: {
            email: pembimbingLapangan.user.email,
            password: hashedPassword,
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
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Pembimbing Berhasil Ditambahkan',
      data: dosenBaru,
    };
  }

  async findAll() {
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
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Diambil',
      data: allPembimbingLapangan,
    };
  }

  async update(nip: string, pembimbingLapangan: PembimbingLapangan) {
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

    try {
      const updatePembimbingLapangan = await this.prisma.pembimbingLapangan.update({
        where: {
          nip: nip,
        },
        data: {
          nip: pembimbingLapangan.nip,
          nama: pembimbingLapangan.nama,
          user: {
            update: {
              email: pembimbingLapangan.user.email,
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
        data: updatePembimbingLapangan,
      };
    } catch (error) {
      
    }
  }

  async remove(nip: string) {
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
  }

  async findAllMahasiswaBimbingan(nip: string) {
    const cekPemlap = await this.prisma.pembimbingLapangan.findUnique({
      where: {
        nip: nip,
      },
    });

    if (!cekPemlap) {
      return {
        status: 'error',
        message: 'Data Pembimbing Lapangan Tidak Ditemukan',
      };
    }
    
    const datarMahasiswa = await this.prisma.mahasiswa.findMany({
      where: {
        pembimbingLapangan: {
          nip: nip,
        },
      },
      select: {
        userId: true,
        nim: true,
        nama: true,
        kelas: true,
        pembimbingLapangan: {
          select: {
            nama: true,
          },
        },
        dosenPembimbingMagang: {
          select: {
            nama: true,
          },
        },
        satker: {
          select: {
            nama: true,
          },
        },
        alamat: true,
      },
      orderBy: {
        userId: 'asc',
      },
    });

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diambil',
      data: datarMahasiswa,
    };
  }
}
