import { Injectable } from '@nestjs/common';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BimbinganMagangService {
  constructor(
    private readonly prismaService: PrismaService
    ) { }
    
  async createByMahasiswa(mahasiswaId: number, createBimbinganMagangDto: CreateBimbinganMagangDto) {
    try {
      const mahasiswa = await this.prismaService.mahasiswa.findFirstOrThrow({
        where: {
          mahasiswaId: mahasiswaId
        }
      });

      const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
        data: {
          tanggal: new Date(createBimbinganMagangDto.tanggal),
          status: "Menunggu",
          tempat: createBimbinganMagangDto.tempat, //nullable
          PesertaBimbinganMahasiswa: {
            create: {
              mahasiswa: {
                connect: {
                  mahasiswaId: mahasiswaId
                }
              },
            }
          },
          dosenPembimbingMagang: {
            connect: {
              dosenId: mahasiswa.dosenId
            }
          }
        },
      });

      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Ditambahkan",
        data: bimbinganMagang
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Menambahkan Bimbingan Magang",
        error: error
      }
    }
  }

  async createByDosenPembimbing(
    dosenId: number,
    createBimbinganMagangDto: CreateBimbinganMagangDto
  ) {
    try {
      // create tanpa peserta dulu
      const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
        data: {
          tanggal: new Date(createBimbinganMagangDto.tanggal),
          status: "Menunggu",
          tempat: createBimbinganMagangDto.tempat, //nullable
          dosenPembimbingMagang: {
            connect: {
              dosenId: dosenId
            }
          },
          PesertaBimbinganMahasiswa: {
            create: {
              mahasiswa: null
            }
          }
        },
      });

      for (let i = 0; i < createBimbinganMagangDto.pesertaBimbinganMahasiswa[0].mahasiswa.length; i++) {
        await this.prismaService.pesertaBimbinganMahasiswa.create({
          data: {
            bimbingan: {
              connect: {
                bimbinganId: bimbinganMagang.bimbinganId,
              }
            },
            mahasiswa: {
              connect: {
                mahasiswaId: createBimbinganMagangDto.pesertaBimbinganMahasiswa[0].mahasiswa[i].mahasiswaId
              }
            }
          }
        })
      }

      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Ditambahkan",
        data: bimbinganMagang
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Menambahkan Bimbingan Magang",
        error: error
      }
    }
  }

  async findAllBimbinganMagangBy(
    query: {
      mahasiswaId: number;
      dosenId: number;
      tanggal: Date;
      status: string;
    }
  ) {
    try {
      const listBimbinganMagang = await this.prismaService.bimbinganMagang.findMany({
        where: {
          dosenId: query.dosenId,
          PesertaBimbinganMahasiswa: {
            some: {
              mahasiswaId: query.mahasiswaId
            }
          },
          tanggal: query.tanggal,
          status: query.status,
        },
      });
      
      return {
        status: "success",
        message: "Data Bimbingan Magang Berhasil Diambil",
        data: listBimbinganMagang
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Data Bimbingan Magang",
        error: error
      }
    }
  }

  async update(bimbinganId: number, updateBimbinganMagangDto: UpdateBimbinganMagangDto) {
    try {
      const bimbinganMagang = await this.prismaService.bimbinganMagang.update({
        where: {
          bimbinganId: bimbinganId
        },
        data: {
          tanggal: new Date(updateBimbinganMagangDto.tanggal),
          tempat: updateBimbinganMagangDto.tempat
        }
      });

      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Diubah",
        data: bimbinganMagang
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengubah Bimbingan Magang",
        error: error
      }
    }
  }

  async confirm(bimbinganId: number) {
    try {
        const bimbinganMagang = await this.prismaService.bimbinganMagang.update({
        where: {
          bimbinganId: bimbinganId
        },
        data: {
          status: "Disetujui",
        }
      });
      
      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Disetujui",
        data: bimbinganMagang
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Menyetujui Bimbingan Magang",
      }
    }
  }
}
