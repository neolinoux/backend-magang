import { ForbiddenException, Inject, Injectable, Res, Response } from '@nestjs/common';
import { CreateAdminProvinsiDto } from 'src/generated/nestjs-dto/create-adminProvinsi.dto';
import { UpdateAdminProvinsiDto } from 'src/generated/nestjs-dto/update-adminProvinsi.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { accessibleBy } from '@casl/prisma';

@Injectable()
@ApiBearerAuth()
export class AdminProvinsiService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) {}

  async create(createAdminProvinsiDto: CreateAdminProvinsiDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);
    if (!ability.can('create', 'AdminProvinsi')) {
      return {
        status: 'error',
        message: 'Anda tidak memiliki izin untuk membuat admin provinsi'
      }
    }

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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);
    
    if (!ability.can('read', 'AdminProvinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat admin provinsi');
    }

    const adminProvinsis = await this.prisma.adminProvinsi.findMany({
      where: {
        AND: [
          accessibleBy(ability).AdminProvinsi,
          {
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
          }
        ],
      },
      select: {
        adminProvinsiId: true,
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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'AdminProvinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate admin provinsi');
    }

    await this.prisma.adminProvinsi.findFirstOrThrow({
      where: {
        adminProvinsiId: adminProvinsiId,
        AND: [accessibleBy(ability).AdminProvinsi]
      }
    }).catch(() => {
      throw new ForbiddenException('Admin Provinsi tidak ditemukan');
    });

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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'AdminProvinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus admin provinsi');
    }

    await this.prisma.adminProvinsi.findFirstOrThrow({
      where: {
        adminProvinsiId: adminProvinsiId,
        AND: [accessibleBy(ability).AdminProvinsi]
      }
    }).catch(() => {
      throw new ForbiddenException('Admin Provinsi tidak ditemukan');
    });

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
