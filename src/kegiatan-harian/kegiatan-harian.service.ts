import { Injectable } from '@nestjs/common';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { CreateTipeKegiatanDto } from 'src/generated/nestjs-dto/create-tipeKegiatan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { parse } from 'path';

@Injectable()
export class KegiatanHarianService {
  constructor(
    private prismaService: PrismaService
  ) { }

  //  TIPE KEGIATAN
  async createTipeKegiatan(tipeKegiatan: CreateTipeKegiatanDto, mahasiswaId: number) {
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
  }

  async findAllTipeKegiatan(params) {
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
  }

  // CATATAN KEGIATAN HARIAN
  async createKegiatanHarian(createKegiatanHarian: CreateKegiatanHarianDto, mahasiswaId: number) {
    const data = await this.prismaService.kegiatanHarian.create({
      data: {
        tanggal: new Date(createKegiatanHarian.tanggal),
        deskripsi: createKegiatanHarian.deskripsi,
        volume: createKegiatanHarian.volume,
        satuan: createKegiatanHarian.satuan,
        durasi: createKegiatanHarian.durasi,
        pemberiTugas: createKegiatanHarian.pemberiTugas,
        statusPenyelesaian: createKegiatanHarian.statusPenyelesaian || 0,
        tipeKegiatan: {
          connect: {
            // cek jika mahasiswa sudah memiliki tipe kegiatan, jika belum maka error
            tipeKegiatanId: (
              await this.prismaService.tipeKegiatan.findFirstOrThrow({
                where: {
                  tipeKegiatanId: createKegiatanHarian.tipeKegiatan.tipeKegiatanId,
                }
              })
            ).tipeKegiatanId
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
  }

  async findAllKegiatanHarianBy(params) {
    const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
      where: {
        mahasiswa: {
          nim: params.nim
        },
        tanggal: params.tanggal === undefined ? undefined : new Date(params.tanggal),
        tipeKegiatan: {
          nama: {
            contains: params.namaTipeKegiatan
          }
        },
        statusPenyelesaian: parseInt(params.statusPenyelesaian) || undefined,
        pemberiTugas: {
          contains: params.pemberiTugas
        },
        satuan: {
          contains: params.satuan
        }
      },
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Diambil',
      data: kegiatanHarian
    }
  }

  async updateKegiatanHarian(
    kegiatanHarianId: number,
    updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
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
  }

  async konfirmasiKegiatanHarian(
    kegiatanId: number,
    kegiatanHarian: UpdateKegiatanHarianDto
  ) {
      const data = await this.prismaService.kegiatanHarian.update({
        where: {
          kegiatanId: kegiatanId
        },
        data: {
          statusPenyelesaian: kegiatanHarian.statusPenyelesaian
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Dikonfirmasi',
        data: data
      }
  }

  async remove(kegiatanHarianId: number) {
    const kegiatanHarian = await this.prismaService.kegiatanHarian.delete({
      where: {
        kegiatanId: kegiatanHarianId
      }
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Dihapus',
      data: kegiatanHarian
    }
  }
}
