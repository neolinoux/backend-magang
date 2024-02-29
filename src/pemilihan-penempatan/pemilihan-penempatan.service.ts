import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(private prisma: PrismaService) { }
  
  async findAllPemilihanPenempatanBy(params: any) {
    try {
      const data = await this.prisma.satkerPilihan.findMany({
        where: {
          satker: {
            kode: params.kodeSatker,
            provinsi: {
              kodePriovinsi: params.kodeProvinsi
            }
          }
        },
        select: {
          mahasiswa: {
            select: {
              nama: true,
              nim: true,
              alamat: true,
            }
          },
          satker: {
            select: {
              nama: true,
            }
          },
          status: true,
        }
      });
  
      return {
        status: 'success',
        message: 'Data Pemilihan Penempatan Berhasil Diambil',
        data: data
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
      const data = await this.prisma.satkerPilihan.update({
        where: {
          satkerPilihanId: id
        },
        data: {
          status: body.status
        },
        select: {
          satkerPilihanId: true,
          mahasiswa: {
            select: {
              nama: true,
              nim: true,
              alamat: true,
            }
          },
          satker: {
            select: {
              nama: true,
            }
          },
          status: true,
        }
      });
  
      return {
        status: 'success',
        message: 'Status Pemilihan Penempatan Berhasil Diubah',
        data: data
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

      // object value to array
      daftarPilihan = Object.keys(daftarPilihan).map((key) => {
        return {
          value: daftarPilihan[key]
        }
      });

      for (let i = 0; i < Object.keys(daftarPilihan).length; i++) {
        const data = await this.prisma.satkerPilihan.create({
          data: {
            mahasiswa: {
              connect: {
                nim: body.nim
              }
            },
            satker: {
              connect: {
                kode: daftarPilihan[i].value,
              }
            },
            status: 'Menunggu'
          },
        });
    
        return {
          status: 'success',
          message: 'Pemilihan Penempatan Berhasil Ditambahkan',
        }
      }

    } catch (error) {
      return {
        status: 'error',
        message: 'Pemilihan Penempatan Gagal Dibuat',
      }
    }
  }

  async deletePemilihanPenempatan(id: number) {
    try {
      this.prisma.satkerPilihan.delete({
        where: {
          satkerPilihanId: id
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
