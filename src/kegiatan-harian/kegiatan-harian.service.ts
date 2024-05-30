import { Injectable } from '@nestjs/common';
import { TipeKegiatan } from 'src/generated/nestjs-dto/tipeKegiatan.entity';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateTipeKegiatanDto } from 'src/generated/nestjs-dto/create-tipeKegiatan.dto';

@Injectable()
export class KegiatanHarianService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) { }

  async createKegiatanHarian(createKegiatanHarian: CreateKegiatanHarianDto, mahasiswaId: number) {
    try {
      const data = await this.prismaService.kegiatanHarian.create({
        data: {
          tanggal: new Date(createKegiatanHarian.tanggal),
          deskripsi: createKegiatanHarian.deskripsi,
          volume: createKegiatanHarian.volume,
          satuan: createKegiatanHarian.satuan,
          durasi: createKegiatanHarian.durasi,
          pemberiTugas: createKegiatanHarian.pemberiTugas,
          statusPenyelesaian: createKegiatanHarian.statusPenyelesaian,
          tipeKegiatan: {
            connect: {
              tipeKegiatanId: createKegiatanHarian.tipeKegiatan.tipeKegiatanId
            }
          },
          mahasiswa: {
            connect: {
              mahasiswaId: mahasiswaId
            }
          }
        }
      });

      return {
        status: "success",
        message: "Kegiatan Harian Berhasil Ditambahkan",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Kegiatan Harian Gagal Ditambahkan",
        error: error.message
      }
    }
  }

  async createTipeKegiatan(tipeKegiatan: CreateTipeKegiatanDto, mahasiswaId: number) {
    try {
      const data = await this.prismaService.tipeKegiatan.create({
        data: {
          nama: tipeKegiatan.nama,
          mahasiswa: {
            connect: {
              mahasiswaId: mahasiswaId
            }
          }
        }
      })

      return {
        status: "success",
        message: "Tipe Kegiatan Harian Berhasil Ditambahkan",
        data: data
      }
    } catch (error) {
      return {
        status: "success",
        message: "Tipe Kegiatan Harian Gagal Ditambahkan"
      }
    }
  }

  async findAllKegiatanHarianMahasiswa(
    mahasiswaId: number,
    params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      namaTipeKegiatan: string,
      statusPenyelesaian: number,
    }
  ) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
        where: {
          mahasiswa: {
            mahasiswaId: mahasiswaId,
          },
          tanggal: params.tanggal !== undefined ? new Date(params.tanggal) : undefined,
          tipeKegiatan: {
            nama: {
              contains: params.namaTipeKegiatan
            }
          },
          statusPenyelesaian: params.statusPenyelesaian,
          pemberiTugas: {
            contains: params.pemberiTugas
          },
          satuan: params.satuan
        },
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Diambil',
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Diambil',
        data: error
      } 
    }
  }

  async findAllTipeKegiatan(
    params: {
      nama: string
    }
  ) {
    try {
      const tipeKegiatan = await this.prismaService.tipeKegiatan.findMany({
        where: {
          nama: {
            contains: params.nama
          },
        }
      });

      return {
        status: 'success',
        message: 'Tipe Kegiatan Berhasil Diambil',
        data: tipeKegiatan
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Tipe Kegiatan Gagal Diambil',
        data: error
      }
    }
  }

  async findAllKegiatanHarianPembimbingLapangan(
    pemlapId: number,
    params: {
      nim: string,
      tanggal: Date,
      satuan: string,
      pemberiTugas: string,
      namaTipeKegiatan: string,
      statusPenyelesaian: number
    }
  ) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
        where: {
          mahasiswa: {
            pembimbingLapangan: {
              pemlapId: pemlapId
            },
            nim: params.nim
          },
          tanggal: {
            equals: params.tanggal !== undefined ? new Date(params.tanggal) : undefined
          },
          tipeKegiatan: {
            nama: params.namaTipeKegiatan
          },
          statusPenyelesaian: {
            equals: params.statusPenyelesaian
          },
          pemberiTugas: params.pemberiTugas,
          satuan: params.satuan
        },
      });

      return {
        status: "success",
        message: "Berhasil Mengambil Kegiatan Harian",
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Kegiatan Harian",
        data: error
      }
    }
  }

  async findAllKegiatanHarianDosenPembimbing(
    dosenId: number,
    params: {
      nim: string,
      tanggal: Date,
      namaTipeKegiatan: string,
      statusPenyelesaian: number,
      pemberiTugas: string,
      satuan: string
    }
  ) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
        where: {
          mahasiswa: {
            dosenPembimbingMagang: {
              dosenId: dosenId
            },
            nim: params.nim
          },
          tanggal: {
            equals: params.tanggal !== undefined ? new Date(params.tanggal) : undefined
          },
          tipeKegiatan: {
            nama: params.namaTipeKegiatan
          },
          statusPenyelesaian: params.statusPenyelesaian,
          pemberiTugas: {
            contains: params.pemberiTugas
          },
          satuan: {
            contains: params.satuan
          }
        }
      });

      return {
        status: "success",
        message: "Berhasil Mengambil Kegiatan Harian",
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Kegiatan Harian",
        data: error
      }
    }
  }

  async updateKegiatanHarian(
    kegiatanHarianId: number,
    updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.update({
        where: {
          kegiatanId: kegiatanHarianId
        },
        data: {
          tanggal: new Date(updateKegiatanHarianDto.tanggal),
          deskripsi: updateKegiatanHarianDto.deskripsi,
          volume: updateKegiatanHarianDto.volume,
          satuan: updateKegiatanHarianDto.satuan,
          durasi: updateKegiatanHarianDto.durasi,
          pemberiTugas: updateKegiatanHarianDto.pemberiTugas,
          statusPenyelesaian: updateKegiatanHarianDto.statusPenyelesaian,
          tipeKegiatan: {
            connect: {
              tipeKegiatanId: updateKegiatanHarianDto.tipeKegiatan.tipeKegiatanId
            }
          }
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Diupdate',
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Diupdate',
        data: error
      }
    }
  }

  async konfirmasiKegiatanHarian(
    kegiatanId: number, konfirmasi: {
      statusPenyelesaian: number
    }
  ) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.update({
        where: {
          kegiatanId: kegiatanId
        },
        data: {
          statusPenyelesaian: konfirmasi.statusPenyelesaian
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Dikonfirmasi',
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Dikonfirmasi',
        data: error
      }
    }
  }

  async remove(kegiatanId: number) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.delete({
        where: {
          kegiatanId: kegiatanId
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Dihapus',
        data: kegiatanHarian
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Dihapus',
        data: error
      }
    }
  }
}
