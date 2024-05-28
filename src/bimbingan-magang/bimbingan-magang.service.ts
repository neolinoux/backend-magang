import { Injectable } from '@nestjs/common';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BimbinganMagangService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
    ) { }
    
  async createByMahasiswa(createBimbinganMagangDto: CreateBimbinganMagangDto, req: any) {
    try {
      const userId = await this.jwtService.decode(req.headers['authorization'].split(' ')[1])['id'];
      const mahasiswa = await this.prismaService.mahasiswa.findUnique({
        where: {
          userId: userId
        },
        select: {
          nim: true,
          nipDosen: true
        }
      });

      const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
        data: {
          tanggal: new Date(createBimbinganMagangDto.tanggal),
          status: "Menunggu",
          tempat: createBimbinganMagangDto.tempat, //nullable
          PesertaBimbinganMagang: {
            create: {
              mahasiswa: {
                connect: {
                  nim: mahasiswa.nim
                }
              },
              dosen: {
                connect: {
                  nip: mahasiswa.nipDosen
                }
              }
            }
          },
        },
        select: {
          bimbinganId: true,
          tanggal: true,
          status: true,
          tempat: true,
          PesertaBimbinganMagang: {
            select: {
              mahasiswa: {
                select: {
                  nim: true,
                  nama: true
                }
              },
              dosen: {
                select: {
                  nip: true,
                  nama: true
                }
              }
            }
          }
        }
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

  async createByDosenPembimbing(createBimbinganMagangDto: CreateBimbinganMagangDto, req: any) {
    try {
      const userId = await this.jwtService.decode(req.headers['authorization'].split(' ')[1])['id'];
      const dosen = await this.prismaService.dosenPembimbingMagang.findUnique({
        where: {
          userId: userId
        },
        select: {
          nip: true,
          mahasiswa: {
            select: {
              nim: true,
              nama: true
            }
          }
        }
      });

      const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
        data: {
          tanggal: new Date(createBimbinganMagangDto.tanggal),
          status: "Menunggu",
          tempat: createBimbinganMagangDto.tempat, //nullable
        },
        select: {
          bimbinganId: true,
        }
      });

      for (let i = 0; i < createBimbinganMagangDto.pesertaBimbinganMagang[0].mahasiswa.length; i++) {
        await this.prismaService.pesertaBimbinganMagang.create({
          data: {
            bimbingan: {
              connect: {
                bimbinganId: bimbinganMagang.bimbinganId
              }
            },
            mahasiswa: {
              connect: {
                nim: createBimbinganMagangDto.pesertaBimbinganMagang[0].mahasiswa[i].nim
              }
            },
            dosen: {
              connect: {
                nip: dosen.nip
              }
            }
          }
        });
      }

      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Ditambahkan",
        // data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Menambahkan Bimbingan Magang",
        error: error
      }
    }
  }

  async findAllBimbinganMagangMahasiswaBy(nim: string) {
    try {
      const data = await this.prismaService.bimbinganMagang.findMany({
        where: {
          PesertaBimbinganMagang: {
            some: {
              mahasiswa: {
                nim: nim
              }
            },
          },
        },
        orderBy: {
          tanggal: "asc"
        },
      });
      
      return {
        status: "success",
        message: "Data Bimbingan Magang Berhasil Diambil",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Data Bimbingan Magang",
        error: error
      }
    }
  }

  async findAllBimbinganMagangDosenPembimbingBy(nip: string, query: any) {
    try {
      const data = await this.prismaService.bimbinganMagang.findMany({
        where: {
          PesertaBimbinganMagang: {
            some: {
              dosen: {
                nip: nip
              }
            },
          },
          status: query.status,
          tanggal: query.tanggal
        },
        select: {
          bimbinganId: true,
          tanggal: true,
          status: true,
          tempat: true,
          PesertaBimbinganMagang: {
            select: {
              mahasiswa: {
                select: {
                  nim: true,
                  nama: true
                }
              }
            }
          }
        },
        orderBy: {
          tanggal: "asc"
        },
      });
      
      return {
        status: "success",
        message: "Data Bimbingan Magang Berhasil Diambil",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengambil Data Bimbingan Magang",
        error: error.message
      }
    }
  }

  async update(id: number, updateBimbinganMagangDto: UpdateBimbinganMagangDto, req: any) {
    try {
      const userId = await this.jwtService.decode(req.headers['authorization'].split(' ')[1])['id'];
      const mahasiswa = await this.prismaService.mahasiswa.findUnique({
        where: {
          userId: userId
        },
      });

      const cekBimbingan = await this.prismaService.pesertaBimbinganMagang.findFirst({
        where: {
          bimbinganId: id,
          mahasiswa: {
            nim: mahasiswa.nim,
          }
        },
      });

      if (!cekBimbingan) {
        return {
          status: "error",
          message: "Bimbingan Magang Tidak Ditemukan",
        }
      }

      const data = await this.prismaService.bimbinganMagang.update({
        where: {
          bimbinganId: id
        },
        data: {
          tanggal: new Date(updateBimbinganMagangDto.tanggal),
          tempat: updateBimbinganMagangDto.tempat
        }
      });

      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Diubah",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Mengubah Bimbingan Magang",
        error: error.message
      }
    }
  }

  async confirm(id: number, req: any) {
    try {
      const userId = await this.jwtService.decode(req.headers['authorization'].split(' ')[1])['id'];
      const dosen = await this.prismaService.dosenPembimbingMagang.findUnique({
        where: {
          userId: userId
        },
        select: {
          nip: true
        }
      });
      
      const cekBimbingan = await this.prismaService.pesertaBimbinganMagang.findFirst({
        where: {
          bimbinganId: id,
          dosen: {
            nip: dosen.nip,
          }
        },
        select: {
          bimbinganId: true
        }
      });
      
      if (!cekBimbingan) {
        return {
          status: "error",
          message: "Bimbingan Magang Tidak Ditemukan",
        }
      }
      
      const data = await this.prismaService.bimbinganMagang.update({
        where: {
          bimbinganId: id
        },
        data: {
          status: "Disetujui",
        }
      });
      
      return {
        status: "success",
        message: "Bimbingan Magang Berhasil Disetujui",
        data: data
      }
    } catch (error) {
      return {
        status: "error",
        message: "Gagal Menyetujui Bimbingan Magang",
      }
    }
  }
}
