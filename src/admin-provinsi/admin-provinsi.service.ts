import { Injectable } from '@nestjs/common';
import { CreateAdminProvinsiDto } from 'src/generated/nestjs-dto/create-adminProvinsi.dto';
import { UpdateAdminProvinsiDto } from 'src/generated/nestjs-dto/update-adminProvinsi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
@ApiBearerAuth()
export class AdminProvinsiService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createAdminProvinsiDto: CreateAdminProvinsiDto) {
    const adminProvinsi = await this.prisma.adminProvinsi.create({
      data: {
        user: {
          create: {
            email: createAdminProvinsiDto.user.email,
            password: await bcrypt.hash(createAdminProvinsiDto.user.password, 10),
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true
                  }
                })).tahunAjaranId
              }
            },
            userRoles: {
              create: {
                roleId: 7
              }
            }
          }
        },
        provinsi: {
          connect: {
            kodeProvinsi: createAdminProvinsiDto.kodeProvinsi
          }
        }
      },
      select: {
        user: true,
        provinsi: true,
        satker: true
      }
    });

    return {
      status: 'success',
      message: 'Admin Provinsi berhasil dibuat',
      data: adminProvinsi
    }
  }

  async findAllAdminProvinsiBy(params) {
    const adminProvinsis = await this.prisma.adminProvinsi.findMany({
      where: {
        user: {
          email: {
            contains: params.email
          }
        },
        provinsi: {
          nama: {
            contains: params.namaProvinsi
          },
          kodeProvinsi: {
            contains: params.kodeProvinsi
          },
        }
      },
      select: {
        user: true,
        provinsi: true,
        satker: true
      }
    });

    return {
      status: 'success',
      message: 'Admin Provinsi berhasil ditemukan',
      data: adminProvinsis
    }
  }

  async update(
    adminProvinsiId: number,
    updateAdminProvinsiDto: UpdateAdminProvinsiDto
  ) {
    const adminProvinsi = await this.prisma.adminProvinsi.update({
      where: {
        adminProvinsiId
      },
      data: {
        user: {
          update: {
            email: updateAdminProvinsiDto.user.email,
            password: updateAdminProvinsiDto.user.password ? await bcrypt.hash(updateAdminProvinsiDto.user.password, 10) : undefined
          }
        }
      },
      select: {
        user: true,
        provinsi: true,
        satker: true
      }
    });

    return {
      status: 'success',
      message: 'Admin Provinsi berhasil diupdate',
      data: adminProvinsi
    }
  }

  async remove(adminProvinsiId: number) {
    await this.prisma.adminProvinsi.delete({
      where: {
        adminProvinsiId
      }
    });

    return {
      status: 'success',
      message: 'Admin Provinsi berhasil dihapus'
    }
  }
}
