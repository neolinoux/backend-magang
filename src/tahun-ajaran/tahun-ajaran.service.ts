import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTahunAjaranDto } from 'src/generated/nestjs-dto/create-tahunAjaran.dto';
import { UpdateTahunAjaranDto } from 'src/generated/nestjs-dto/update-tahunAjaran.dto';

@Injectable()
export class TahunAjaranService {
  constructor(private prismaService: PrismaService) {}

  async create(createTahunAjaranDto: CreateTahunAjaranDto) {
    const tahunAjaran = await this.prismaService.tahunAjaran.create({
      data: {
        tahun: createTahunAjaranDto.tahun,
      },
    });

    //create kapasitas satker dengan tahun ajaran yang baru
    // get all satker
    const satkers = await this.prismaService.satker.findMany();

    // create kapasitas satker
    await this.prismaService.kapasitasSatkerTahunAjaran.createMany({
      data: satkers.map((satker) => ({
        tahunAjaranId: tahunAjaran.tahunAjaranId,
        satkerId: satker.satkerId,
      })),
    });

    // create dosen yang sama pada tahun yg aktif tapi gunakan tahun ajaran baru
    const dosenPembimbingMagangPadaTahunAktif = await this.prismaService.dosenPembimbingMagang.findMany({
      where: {
        user: {
          tahunAjaran: {
            tahunAjaranId: (await this.prismaService.tahunAjaran.findFirst({
              where: {
                isActive: true,
              },
            })).tahunAjaranId
          },
        },
      },
    });

    const userDosens = await this.prismaService.user.findMany({
      where: {
        tahunAjaran: {
          tahunAjaranId: (await this.prismaService.tahunAjaran.findFirst({
            where: {
              isActive: true,
            },
          })).tahunAjaranId
        },
        userRoles: {
          every: {
            roleId: 3,
          },
        },
      },
    });

    // create dosen pembimbing magang
    for (const dosen of dosenPembimbingMagangPadaTahunAktif) {
      const userDosen = userDosens.find((user) => user.userId === dosen.userId);

      await this.prismaService.dosenPembimbingMagang.create({
        data: {
          nip: dosen.nip,
          nama: dosen.nama,
          prodi: dosen.prodi,
          user: {
            create: {
              email: userDosen.email,
              password: userDosen.password,
              tahunAjaran: {
                connect: {
                  tahunAjaranId: tahunAjaran.tahunAjaranId,
                },
              },
            },
          },
        },
      });
    }

    return {
      status: "success",
      message: 'Tahun ajaran berhasil dibuat',
      data: tahunAjaran,
    };
  }

  async findAllBy(params) {
    const tahunAjarans = await this.prismaService.tahunAjaran.findMany({
      where: {
        tahun: {
          contains: params.tahun,
        },
      },
      orderBy: {
        tahunAjaranId: 'asc',
      },
    });

    return {
      status: "success",
      message: 'Tahun ajaran berhasil ditemukan',
      data: tahunAjarans,
    };
  }

  async update(tahunAjaranId: number) {
    const tahunAjaran = await this.prismaService.tahunAjaran.update({
      where: {
        tahunAjaranId: tahunAjaranId,
      },
      data: {
        isActive: true,
      },
    });

    // set tahun ajaran lainnya menjadi tidak aktif
    await this.prismaService.tahunAjaran.updateMany({
      where: {
        tahunAjaranId: {
          not: tahunAjaranId,
        },
      },
      data: {
        isActive: false,
      },
    });

    // set tahun ajaran admin, admin satker, admin provinsi, tim magang, BAU, BAAK menjadi yang baru
    await this.prismaService.user.updateMany({
      where: {
        userRoles: {
          every: {
            OR: [
              {
                roleId: 1,
              },
              {
                roleId: 2,
              },
              {
                roleId: 5,
              },
              {
                roleId: 6,
              },
              {
                roleId: 7,
              },
              {
                roleId: 8,
              }
            ],
          },
        },
      },
      data: {
        tahunAjaranId: tahunAjaran.tahunAjaranId,
      },
    });

    return {
      status: "success",
      message: 'Tahun ajaran berhasil diupdate',
      data: tahunAjaran,
    };
  }
    

  async remove(tahunAjaranId: number) {
    const tahunAjaran = await this.prismaService.tahunAjaran.findFirst({
      where: {
        tahunAjaranId: tahunAjaranId,
      },
    });

    if (!tahunAjaran.isActive) {
      await this.prismaService.tahunAjaran.delete({
        where: {
          tahunAjaranId: tahunAjaranId,
        },
      });

      return {
        status: "success",
        message: 'Tahun ajaran berhasil dihapus',
        data: tahunAjaran,
      };
    }

    return {
      status: "error",
      message: 'Tahun ajaran tidak bisa dihapus karena aktif',
      data: tahunAjaran,
    };
  }
}
