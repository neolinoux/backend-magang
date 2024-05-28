import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/update-dosenPembimbingMagang.dto';
import { CreateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/create-dosenPembimbingMagang.dto';

@Injectable()
export class DosenPembimbingMagangService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAllDosenBy(params: any) {
    try {
      const data = await this.prisma.dosenPembimbingMagang.findMany({
        where: {
          nip: params.nip,
          nama: params.nama,
          tahunAjaranDosen: {
            every: {
              tahunAjaran: {
                tahun: params.tahun,
              },
            },
          },
          prodi: params.prodi,
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          user: {
            select: {
              email: true,
            },
          },
          prodi: true,
          tahunAjaranDosen: {
            select: {
              tahunAjaran: {
                select: {
                  tahun: true,
                },
              },
            },
          },
        },
        orderBy: {
          userId: 'asc',
        },
      });
  
      return {
        status: 'success',
        message: 'Data Dosen Pembimbing Berhasil Diambil',
        data: data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Dosen Pembimbing Gagal Diambil',
        error: error
      };
    }
  }

  async update(nip: string, updateDosenPembimbingMagang: UpdateDosenPembimbingMagangDto) {
    const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
      where: {
        nip: nip,
      },
    });

    if(!dosen){
      return {
        status: 'error',
        message: 'Data Dosen Tidak Ditemukan',
      };
    }

    const updatedDosen = await this.prisma.dosenPembimbingMagang.update({
      where: {
        nip: nip,
      },
      data: {
        user: {
          update: {
            email: updateDosenPembimbingMagang.user.email,
          },
        },
      },
      select: {
        userId: true,
        nip: true,
        nama: true,
        user: {
          select: {
            email: true,
          },
        },
        prodi: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Diubah',
      data: updatedDosen,
    };
  }

  async create(createDosenPembimbingMagang: CreateDosenPembimbingMagangDto) {
    try {
      const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
        where: {
          nip: createDosenPembimbingMagang.nip,
        },
      });
  
      if (dosen) {
        return {
          status: 'error',
          message: 'Data Dosen Sudah Ada',
        };
      }
  
      const hashedPassword = await bcrypt.hash(createDosenPembimbingMagang.user.password, 10);
  
      const dosenBaru = await this.prisma.dosenPembimbingMagang.create({
        data: {
          nip: createDosenPembimbingMagang.nip,
          nama: createDosenPembimbingMagang.nama,
          prodi: createDosenPembimbingMagang.prodi,
          user: {
            create: {
              email: createDosenPembimbingMagang.user.email,
              password: hashedPassword,
            },
          },
          tahunAjaranDosen: {
            create: {
              tahunAjaran: {
                connect: {
                  tahun: createDosenPembimbingMagang.tahunAjaranDosen[0].tahunAjaran.tahun,
                },
              },
            },
          },
        },
        select: {
          userId: true,
          nip: true,
          nama: true,
          prodi: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      });
  
      return {
        status: 'success',
        message: 'Data Dosen Pembimbing Berhasil Ditambahkan',
        data: dosenBaru,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Dosen Pembimbing Gagal Ditambahkan',
        error: error
      };
    }
  }
}
