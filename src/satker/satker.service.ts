import { Injectable } from '@nestjs/common';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SatkerService {
  constructor(private prisma: PrismaService) {}

  async create(satker: Satker) {
    const cekSatker = await this.prisma.satker.findUnique({
      where: {
        kode: satker.kode,
      },
    });

    if (cekSatker) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Sudah Ada',
      }
    }

    const newSatker = await this.prisma.satker.create({
      data: {
        nama: satker.nama,
        alamat: satker.alamat,
        email: satker.email,
        kode: satker.kode,
        kapasitas: satker.kapasitas,
        kabupatenKota: {
          create: {
            nama: satker.kabupatenKota.nama,
            provinsi: {
              create: {
                nama: satker.kabupatenKota.provinsi.nama,
              },
            },
          },
        },
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: newSatker,
    }
  }

  async findAll() {
    const daftarSatker = await this.prisma.satker.findMany({
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: daftarSatker,
    }
  }

  async findOne(kode: string) {
    const satker = await this.prisma.satker.findUnique({
      where: {
        kode: kode,
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: satker,
    }
  }

  async update(kode: string, satker: Satker) {
    const cekSatker = await this.prisma.satker.findUnique({
      where: {
        kode: kode,
      },
    });

    if (!cekSatker) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Tidak Ditemukan',
      }
    }

    const updateSatker = await this.prisma.satker.update({
      where: {
        kode: kode,
      },
      data: {
        nama: satker.nama,
        alamat: satker.alamat,
        email: satker.email,
        kabupatenKota: {
          update: {
            nama: satker.kabupatenKota.nama,
            provinsi: {
              update: {
                nama: satker.kabupatenKota.provinsi.nama,
              },
            },
          },
        },
        kode: satker.kode,
        kapasitas: satker.kapasitas,
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diubah',
      data: updateSatker,
    }
  }

  async remove(kode: string) {
    const cekSatker = await this.prisma.satker.findUnique({
      where: {
        kode: kode,
      },
    });

    if (!cekSatker) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Tidak Ditemukan',
      }
    }

    const deleteSatker = await this.prisma.satker.delete({
      where: {
        kode: kode,
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Dihapus',
      data: deleteSatker,
    }
  }

  async findByProvinsi(kodeProvinsi: string) {
    const satkerProvinsi = await this.prisma.satker.findMany({
      where: {
        kabupatenKota: {
          provinsi: {
            kodePriovinsi: kodeProvinsi,
          },
        },
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berdasarkan Provinsi Berhasil Diambil',
      data: satkerProvinsi,
    }
  }
}
