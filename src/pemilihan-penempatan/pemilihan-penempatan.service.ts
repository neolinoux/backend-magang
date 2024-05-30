import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(private prisma: PrismaService) { }

  async findAllPemilihanPenempatanBy(
    params: {
      satkerId: number,
      mahasiswaId: number
    }
  ) {
    const data = await this.prisma.pilihanSatker.findMany({
      where: {
        satkerId: params.satkerId,
        mahasiswaId: params.mahasiswaId,
      },
    });

    const dataMahasiswa = await this.prisma.mahasiswa.findMany({
      where: {
        mahasiswaId: params.mahasiswaId,
      },
      select: {
        nama: true,
        nim: true,
        alamat: true,
      }
    });

    const dataSatker = await this.prisma.satker.findMany({
      where: {
        satkerId: params.satkerId,
      },
      select: {
        kodeSatker: true,
        nama: true,
      }
    });

    return {
      status: 'success',
      message: 'Data Pemilihan Penempatan Berhasil Diambil',
      data: {
        id: data[0].pilihanSatkerId,
      }
    }
  }

  async confirmPemilihanPenempatan(pilihanId: number, pilihanFinal: any) {
    const confirmPilihan = await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihanFinal.satkerId,
        status: 'Diterima'
      },
      select: {
        pilihanSatkerId: true,
        mahasiswaId: true,
        satkerId: true,
        status: true,
      }
    });

    // ubah status pilihan lainnya menjadi 'Ditolak'
    await this.prisma.pilihanSatker.updateMany({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId,
        NOT: {
          pilihanSatkerId: confirmPilihan.pilihanSatkerId
        }
      },
      data: {
        status: 'Ditolak'
      }
    });

    // connect mahasiswa dengan satker pilihan
    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId
      },
      data: {
        satkerId: confirmPilihan.satkerId
      }
    });

    return {
      status: 'success',
      message: 'Status Pemilihan Penempatan Berhasil Diubah',
      data: {
        pilihanSatkerId: confirmPilihan.pilihanSatkerId,
        mahasiswaId: confirmPilihan.mahasiswaId,
        satkerId: confirmPilihan.satkerId,
        status: confirmPilihan.status
      }
    }
  }

  async createPemilihanPenempatan(
    mahasiswaId: number,
    pilihan: [
      satkerId1: number,
      satkerId2: number,
      satkerId3: number,
    ]
  ) {
    try {
      let data = null;

      for (let i = 0; i < pilihan.length; i++) {
        
        if (pilihan[i] === null) continue;
        
        data.push(await this.prisma.pilihanSatker.create({
          data: {
            mahasiswaId: mahasiswaId,
            satkerId: pilihan[i],
            status: 'Menunggu'
          },
          select: {
            pilihanSatkerId: true,
            mahasiswaId: true,
            satkerId: true,
            status: true,
          }
        }));
      }
    
      return {
        status: 'success',
        message: 'Pemilihan Penempatan Berhasil Ditambahkan',
        data: data
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
    mahasiswaId: number,
    pilihan: [
      satkerId1: number,
      satkerId2: number,
      satkerId3: number,
    ]
  ) {
    try {
      let data = null;

      // select all pilihan satker by mahasiswaId
      const pilihanSatker = await this.prisma.pilihanSatker.findMany({
        where: {
          mahasiswaId: mahasiswaId
        }
      });

      // edit pilihan satker by mahasiswaId
      for (let i = 0; i < pilihan.length; i++) {
        if (pilihan[i] === null) continue;

        data.push(await this.prisma.pilihanSatker.update({
          where: {
            pilihanSatkerId: pilihanSatker[i].pilihanSatkerId
          },
          data: {
            satkerId: pilihan[i]
          },
          select: {
            pilihanSatkerId: true,
            mahasiswaId: true,
            satkerId: true,
            status: true,
          }
        }));
      }

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

  async deletePemilihanPenempatan(pilihanId: number) {
    try {
      await this.prisma.pilihanSatker.delete({
        where: {
          pilihanSatkerId: pilihanId
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
