import { Injectable } from '@nestjs/common';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(private prisma: PrismaService) { }

  async findAllPemilihanPenempatanBy(params) {
    const data = await this.prisma.pilihanSatker.findMany({
      where: {
        satkerId: params.satkerId,
        mahasiswaId: params.mahasiswaId,
      },
    });

    return {
      status: 'success',
      message: 'Data Pemilihan Penempatan Berhasil Diambil',
      data: data
    }
  }

  async confirmPemilihanPenempatan(pilihanId: number, pilihanFinal: Satker) {
    const confirmPilihan = await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihanFinal.satkerId,
        status: 'Diterima',
        isActive: false
      },
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
        status: 'Ditolak',
        isActive: false
      }
    });

    // connect mahasiswa dengan satker pilihan
    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId
      },
      data: {
        satker: {
          connect: {
            satkerId: confirmPilihan.satkerId
          }
        }
      }
    });

    return {
      status: 'success',
      message: 'Status Pemilihan Penempatan Berhasil Diubah',
    }
  }

  async createPemilihanPenempatan(
    mahasiswaId: number,
    pilihan: Satker[]
  ) {
    for (let i = 0; i < pilihan.length; i++) {
      await this.prisma.pilihanSatker.create({
        data: {
          mahasiswaId: mahasiswaId,
          satkerId: pilihan[i].satkerId,
          status: 'Menunggu',
          isActive: true
        }
      });
    }
  
    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Ditambahkan',
    }
  }

  async pindahPemilihanPenempatan(
    pilihanId: number,
    pilihan: Satker
  ) {
    await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihan.satkerId,
        status: 'Menunggu',
        isActive: true
      }
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dipindahkan',
    }
  }

  async deletePemilihanPenempatan(pilihanId: number) {
    await this.prisma.pilihanSatker.delete({
      where: {
        pilihanSatkerId: pilihanId
      },
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dihapus'
    }
  }
}
