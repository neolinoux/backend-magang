import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(private prisma: PrismaService) { }

  async findAllPemilihanPenempatanBy(params: any) {
    try {
      const data = await this.prisma.pilihanSatker.findMany({
        where: {
          kodeSatker: params.kodeSatker,
          nim: params.nim,
        },
        select: {
          nim: true,
          status: true,
          pilihanSatkerId: true,
        }
      });

      const dataMahasiswa = await this.prisma.mahasiswa.findMany({
        where: {
          nim: params.nim,
        },
        select: {
          nama: true,
          nim: true,
          alamat: true,
        }
      });

      const dataSatker = await this.prisma.satker.findMany({
        where: {
          kode: params.kodeSatker,
        },
        select: {
          kode: true,
          nama: true,
        }
      });

      return {
        status: 'success',
        message: 'Data Pemilihan Penempatan Berhasil Diambil',
        data: {
          pilihanSatkerId: data[0].pilihanSatkerId,
          mahasiswa: dataMahasiswa,
          satker: dataSatker
        }
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Pemilihan Penempatan Gagal Diambil',
      }
    }
  }

  async confirmPemilihanPenempatan(id: number, body: any) {
    try {
      const data = await this.prisma.pilihanSatker.update({
        where: {
          pilihanSatkerId: id
        },
        data: {
          status: body.status // 'Diterima' atau 'Ditolak' atau 'Diubah'
        },
        select: {
          pilihanSatkerId: true,
          nim: true,
          kodeSatker: true,
          status: true,
        }
      });

      const dataMahasiswa = await this.prisma.mahasiswa.findMany({
        where: {
          nim: data.nim,
        },
        select: {
          nama: true,
          nim: true,
          alamat: true,
        }
      });

      const dataSatker = await this.prisma.satker.findMany({
        where: {
          kode: data.kodeSatker,
        },
        select: {
          kode: true,
          nama: true,
        }
      });

      return {
        status: 'success',
        message: 'Status Pemilihan Penempatan Berhasil Diubah',
        data: {
          mahasiswa: dataMahasiswa,
          satker: dataSatker,
          status: data.status
        }
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Status Pemilihan Penempatan Gagal Diubah',
      }
    }
  }

  async createPemilihanPenempatan(body: any) {
    try {
      let daftarPilihan = body.satker;
      // console.log(body);
      // object value to array
      daftarPilihan = Object.keys(daftarPilihan).map((key) => {
        return {
          value: daftarPilihan[key]
        }
      });

      let data = null;

      for (let i = 0; i < daftarPilihan.length; i++) {
        data = await this.prisma.pilihanSatker.create({
          data: {
            nim: body.nim,
            kodeSatker: daftarPilihan[i].value,
            status: 'Menunggu'
          },
          select: {
            pilihanSatkerId: true,
            nim: true,
            kodeSatker: true,
            status: true,
          }
        });
      }
    
      return {
        status: 'success',
        message: 'Pemilihan Penempatan Berhasil Ditambahkan',
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Pemilihan Penempatan Gagal Dibuat',
        error: error.message
      }
    }
  }

  async pindahPemilihanPenempatan(
    id: string,
    body: {
      kodeSatker: string
    }
  ) {
    try {
      let data = null;

      data = await this.prisma.pilihanSatker.update({
        where: {
          pilihanSatkerId: parseInt(id)
        },
        data: {
          kodeSatker: body.kodeSatker,
          status: 'Menunggu'
        },
        select: {
          pilihanSatkerId: true,
          nim: true,
          kodeSatker: true,
          status: true,
        }
      });

      return {
        status: 'success',
        message: 'Pemilihan Penempatan Berhasil Dipindahkan',
        data: data
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Pemilihan Penempatan Gagal Dipindahkan',
      }
    }
  }

  async deletePemilihanPenempatan(id: string) {
    try {
      await this.prisma.pilihanSatker.delete({
        where: {
          pilihanSatkerId: parseInt(id)
        },
      });

      return {
        status: 'success',
        message: 'Pemilihan Penempatan Berhasil Dihapus'
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Pemilihan Penempatan Gagal Dihapus',
      }
    }
  }
}
