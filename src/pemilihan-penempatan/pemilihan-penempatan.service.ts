import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(private prisma: PrismaService) { }

  async findAllPemilihanPenempatanBy(params: any) {
    try {
      const data = await this.prisma.pilihanSatker.findMany({
        where: {
          satker: {
            some: {
              kode: params.kodeSatker
            }
          },
          mahasiswa: {
            nim: params.nim
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
              kode: true,
              kodeProvinsi: true,
              kodeKabupatenKota: true,
              alamat: true,
              kapasitas: true,
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
      const data = await this.prisma.pilihanSatker.update({
        where: {
          pilihanSatkerId: id
        },
        data: {
          status: body.status // 'Diterima' atau 'Ditolak' atau 'Diubah'
        },
        select: {
          pilihanSatkerId: true,
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
      // console.log(body);
      // object value to array
      daftarPilihan = Object.keys(daftarPilihan).map((key) => {
        return {
          value: daftarPilihan[key]
        }
      });

      let data = null;

      if (daftarPilihan.length == 1) {
        data = await this.prisma.pilihanSatker.create({
          data: {
            mahasiswa: {
              connect: {
                nim: body.mahasiswa.nim,
              }
            },
            satker: {
              connect: [
                { kode: daftarPilihan[0].value },
              ]
            },
            status: 'Menunggu'
          },
        });
      }

      if (daftarPilihan.length == 2) {
        data = await this.prisma.pilihanSatker.create({
          data: {
            mahasiswa: {
              connect: {
                nim: body.mahasiswa.nim,
              }
            },
            satker: {
              connect: [
                { kode: daftarPilihan[0].value },
                { kode: daftarPilihan[1].value },
              ]
            },
            status: 'Menunggu'
          },
        });
      }

      if (daftarPilihan.length == 3) {
        data = await this.prisma.pilihanSatker.create({
          data: {
            mahasiswa: {
              connect: {
                nim: body.mahasiswa.nim,
              }
            },
            satker: {
              connect: [
                { kode: daftarPilihan[0].value },
                { kode: daftarPilihan[1].value },
                { kode: daftarPilihan[2].value },
              ]
            },
            status: 'Menunggu'
          },
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

  async pindahPemilihanPenempatan(id: string, body: any) {
    try {
      let data = null;

      if (body.satker.length == 1) {
        data = await this.prisma.pilihanSatker.update({
          where: {
            pilihanSatkerId: parseInt(id)
          },
          data: {
            satker: {
              connect: [
                { kode: body.satker[0] },
              ]
            }
          },
          select: {
            pilihanSatkerId: true,
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
      }

      if (body.satker.length == 2) {
        data = await this.prisma.pilihanSatker.update({
          where: {
            pilihanSatkerId: parseInt(id)
          },
          data: {
            satker: {
              connect: [
                { kode: body.satker[0] },
                { kode: body.satker[1] },
              ]
            }
          },
          select: {
            pilihanSatkerId: true,
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
      }

      if (body.satker.length == 3) {
        data = await this.prisma.pilihanSatker.update({
          where: {
            pilihanSatkerId: parseInt(id)
          },
          data: {
            satker: {
              connect: [
                { kode: body.satker[0] },
                { kode: body.satker[1] },
                { kode: body.satker[2] },
              ]
            }
          },
          select: {
            pilihanSatkerId: true,
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
