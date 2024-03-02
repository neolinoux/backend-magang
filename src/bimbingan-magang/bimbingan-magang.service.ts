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

  async create(createBimbinganMagangDto: CreateBimbinganMagangDto, req: any) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const userId = await this.jwtService.decode(token)['id'];
      const userRole = await this.prismaService.user.findUnique({
        where: {
          userId: userId
        },
        select: {
          userRoles: {
            select: {
              role: {
                select: {
                  roleName: true
                }
              }
            }
          }
        }
      });

      if (userRole.userRoles[0].role.roleName === "mahasiswa") {
        const mahasiswa = await this.prismaService.mahasiswa.findUnique({
          where: {
            userId: userId
          },
          select: {
            nim: true,
            dosenPembimbingMagang: {
              select: {
                nip: true
              }
            }
          }
        });

        const data = await this.prismaService.bimbinganMagang.create({
          data: {
            tanggal: new Date(createBimbinganMagangDto.tanggal),
            status: "Menunggu",
            tempat: createBimbinganMagangDto.tempat, //nullable
            KelompokBimbinganMagang: {
              create: {
                nim: mahasiswa.nim,
                nipDosen: mahasiswa.dosenPembimbingMagang.nip
              },
            },
          }
        });

        return {
          status: "success",
          message: "Bimbingan Magang Berhasil Ditambahkan",
          // data: data
        }
      }

      const dosen = await this.prismaService.dosenPembimbingMagang.findUnique({
        where: {
          userId: userId
        },
        select: {
          nip: true
        }
      });

      const data = await this.prismaService.bimbinganMagang.create({
        data: {
          tanggal: new Date(createBimbinganMagangDto.tanggal),
          status: "Disetujui",
          tempat: createBimbinganMagangDto.tempat, //nullable
        }
      });

      for (let i = 0; i < createBimbinganMagangDto.peserta.length; i++) {
        await this.prismaService.kelompokBimbinganMagang.create({
          data: {
            bimbingan: {
              connect: {
                bimbinganId: data.bimbinganId
              }
            },
            mahasiswa: {
              connect: {
                nim: createBimbinganMagangDto.peserta[i].nim
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
          KelompokBimbinganMagang: {
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
          KelompokBimbinganMagang: {
            some: {
              dosen: {
                nip: nip
              },
              mahasiswa: {
                nim: {
                  contains: query.nim
                }
              },
            }
          },
          status: query.status,
          tanggal: {
            equals: new Date(query.tanggal)
          }
        },
        select: {
          bimbinganId: true,
          tanggal: true,
          status: true,
          tempat: true,
          KelompokBimbinganMagang: {
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
        error: error
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

      const cekBimbingan = await this.prismaService.kelompokBimbinganMagang.findFirst({
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
          status: updateBimbinganMagangDto.status,
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
      });

      const cekBimbingan = await this.prismaService.kelompokBimbinganMagang.findFirst({
        where: {
          bimbinganId: id,
          dosen: {
            nip: dosen.nip,
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
