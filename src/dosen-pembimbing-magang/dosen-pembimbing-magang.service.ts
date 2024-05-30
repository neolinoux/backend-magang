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

  async findAllDosenBy(
    params: {
      nip: string,
      nama: string,
      prodi: string,
      email: string,
      tahunAjaran: string
    }
  ) {
      const data = await this.prisma.dosenPembimbingMagang.findMany({
        where: {
          nip: params.nip,
          nama: params.nama,
          prodi: {
            contains: params.prodi,
          },
          user: {
            email: {
              contains: params.email,
            },
            tahunAjaran: {
              tahun: {
                contains: params.tahunAjaran,
              },
            }
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
  }

  async create(createDosenPembimbingMagang: CreateDosenPembimbingMagangDto) {
      await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
        where: {
          dosenId: createDosenPembimbingMagang.dosenId,
        },
      });
  
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
              tahunAjaran: {
                connect: {
                  tahun: (await this.prisma.tahunAjaran.findFirst({
                    where: {
                      isActive: true,
                    },
                    select: {
                      tahun: true,
                    },
                  })).tahun,
                }
              },
            },
          },
        },
      });
  
      return {
        status: 'success',
        message: 'Data Dosen Pembimbing Berhasil Ditambahkan',
        data: dosenBaru,
      };
  }

  async update(dosenId: number, updateDosenPembimbingMagang: UpdateDosenPembimbingMagangDto) {
    const dosen = await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
      where: {
        dosenId: dosenId,
      },
    });

    const updatedDosen = await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        user: {
          update: {
            email: updateDosenPembimbingMagang.user.email,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Diubah',
      data: updatedDosen,
    };
  }
}
