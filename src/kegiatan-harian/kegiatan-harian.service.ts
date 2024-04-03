import { Injectable } from '@nestjs/common';
import { TipeKegiatan } from 'src/generated/nestjs-dto/tipeKegiatan.entity';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class KegiatanHarianService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) { }

  async createKegiatanHarian(createKegiatanHarian: CreateKegiatanHarianDto, req: any) {
    try {
      const userId = await this.jwtService.decode(req.headers['authorization'].split(' ')[1])['id'];
      const mahasiswa = await this.prismaService.mahasiswa.findUnique({
        where: {
          userId: userId
        },
        select: {
          nim: true
        }
      });
      
      const data = await this.prismaService.kegiatanHarian.create({
        data: {
          mahasiswa: {
            connect: {
              nim: mahasiswa.nim
            }
          },
          tanggal: new Date(createKegiatanHarian.tanggal),
          deskripsi: createKegiatanHarian.deskripsi,
          volume: createKegiatanHarian.volume,
          satuan: createKegiatanHarian.satuan,
          durasi: createKegiatanHarian.durasi,
          pemberiTugas: createKegiatanHarian.pemberiTugas,
          tipeKegiatan: {
            connect: {
              tipeKegiatanId: createKegiatanHarian.tipeKegiatan.tipeKegiatanId
            }
          },
        }
      })

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

  async create(tipeKegiatan: TipeKegiatan, nim: string) {
    try {
      const data = await this.prismaService.tipeKegiatan.create({
        data: {
          nama: tipeKegiatan.nama,
          mahasiswa: {
            connect: {
              nim: nim,
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

  async findAllKegiatanHarianMahasiswa(nim: string, params: any) {
    try {
      const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
        where: {
          nim: nim,
          tanggal: params.tanggal !== undefined ? new Date(params.tanggal) : undefined,
          tipeKegiatan: params.tipeKegiatan,
          statusPenyelesaian: params.statusPenyelesaian,
          pemberiTugas: params.pemberiTugas,
          satuan: params.satuan
        },
        select: {
          kegiatanId: true,
          tanggal: true,
          deskripsi: true,
          volume: true,
          satuan: true,
          durasi: true,
          pemberiTugas: true,
          statusPenyelesaian: true,
          tipeKegiatan: { //nullable
            select: {
              nama: true
            }
          }
        }
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

  async findAllTipeKegiatan(params: any) {
    try {
      const tipeKegiatan = await this.prismaService.tipeKegiatan.findMany({
        where: {
          nim: params.nim,
          nama: params.nama,
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

  async findAllKegiatanHarianPembimbingLapangan(nip: string, params: any) {
    try {
      const data = await this.prismaService.kegiatanHarian.findMany({
        where: {
          mahasiswa: {
            pembimbingLapangan: {
              nip: nip
            },
            nim: params.nim
          },
          tanggal: {
            equals: params.tanggal !== undefined ? new Date(params.tanggal) : undefined
          },
          tipeKegiatan: {
            nama: params.tipeKegiatan
          },
          statusPenyelesaian: {
            equals: params.statusPenyelesaian
          },
          pemberiTugas: params.pemberiTugas,
          satuan: params.satuan
        },
        select: {
          kegiatanId: true,
          mahasiswa: {
            select: {
              nim: true,
              nama: true
            }
          },
          tanggal: true,
          deskripsi: true,
          volume: true,
          satuan: true,
          durasi: true,
          pemberiTugas: true,
          statusPenyelesaian: true,
          tipeKegiatan: {
            select: {
              nama: true
            }
          }
        }
      });

      return {
        status: "success",
        message: "Berhasil Mengambil Kegiatan Harian",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Kegiatan Harian",
        data: error
      }
    }
  }

  async findAllKegiatanHarianDosenPembimbing(nip: string, params: any) {
    try {
      const data = await this.prismaService.kegiatanHarian.findMany({
        where: {
          mahasiswa: {
            dosenPembimbingMagang: {
              nip: nip
            },
            nim: params.nim
          },
          tanggal: {
            equals: params.tanggal !== undefined ? new Date(params.tanggal) : undefined
          },
          tipeKegiatan: {
            nama: params.tipeKegiatan
          },
          statusPenyelesaian: params.statusPenyelesaian,
          pemberiTugas: params.pemberiTugas,
          satuan: params.satuan
        },
        select: {
          kegiatanId: true,
          mahasiswa: {
            select: {
              nim: true,
              nama: true
            }
          },
          tanggal: true,
          deskripsi: true,
          volume: true,
          satuan: true,
          durasi: true,
          pemberiTugas: true,
          statusPenyelesaian: true,
          tipeKegiatan: {
            select: {
              nama: true
            }
          }
        }
      });

      return {
        status: "success",
        message: "Berhasil Mengambil Kegiatan Harian",
        data: data
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
    nim: string,
    id: number,
    updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
    try {
      const data = await this.prismaService.mahasiswa.update({
        where: {
          nim: nim
        },
        data: {
          kegiatanHarian: {
            update: {
              where: {
                kegiatanId: id
              },
              data: {
                tanggal: updateKegiatanHarianDto.tanggal !== undefined ? new Date(updateKegiatanHarianDto.tanggal) : undefined,
                deskripsi: updateKegiatanHarianDto.deskripsi,
                volume: updateKegiatanHarianDto.volume,
                satuan: updateKegiatanHarianDto.satuan,
                durasi: updateKegiatanHarianDto.durasi,
                pemberiTugas: updateKegiatanHarianDto.pemberiTugas,
                tipeKegiatan: {
                  connect: {
                    tipeKegiatanId: updateKegiatanHarianDto.tipeKegiatan.tipeKegiatanId
                  }
                }
              }
            }
          }
        },
        select: {
          kegiatanHarian: {
            where: {
              kegiatanId: id
            }
          }
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Diupdate',
        data: data
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Diupdate',
        data: error
      }
    }
  }

  async konfirmasiKegiatanHarian(nim: string, id: number, konfirmasi: any) {
    try {
      const data = await this.prismaService.mahasiswa.update({
        where: {
          nim: nim
        },
        data: {
          kegiatanHarian: {
            update: {
              where: {
                kegiatanId: id
              },
              data: {
                statusPenyelesaian: konfirmasi.statusPenyelesaian
              }
            }
          }
        },
        select: {
          kegiatanHarian: {
            where: {
              kegiatanId: id
            }
          }
        }
      });

      return {
        status: 'success',
        message: 'Kegiatan Harian Berhasil Dikonfirmasi',
        data: data
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Kegiatan Harian Gagal Dikonfirmasi',
        data: error
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} kegiatanHarian`;
  }
}
