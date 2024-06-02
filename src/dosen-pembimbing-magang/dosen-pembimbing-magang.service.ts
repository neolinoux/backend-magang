import * as bcrypt from 'bcrypt';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/update-dosenPembimbingMagang.dto';
import { CreateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/create-dosenPembimbingMagang.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';
import { DosenPembimbingMagang } from '../generated/nestjs-dto/dosenPembimbingMagang.entity';

@Injectable()
export class DosenPembimbingMagangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data dosen pembimbing magang');
    }

    const data = await this.prisma.dosenPembimbingMagang.findMany({
      where: {
        AND: [
          accessibleBy(ability).DosenPembimbingMagang,
          {
            nip: {
              contains: params.nip,
            },
            nama: {
              contains: params.nama,
            },
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
          }
        ]
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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data dosen pembimbing magang');
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
            userRoles: {
              create: {
                roleId: 3,
              },
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
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data dosen pembimbing magang');
    }

    await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
      where: {
        dosenId: dosenId,
        AND: [accessibleBy(ability).DosenPembimbingMagang],
      }
    }).catch(() => {
      throw new ForbiddenException('Dosen Pembimbing Magang tidak ditemukan');
    });

    const updatedDosen = await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        nip: updateDosenPembimbingMagang.nip,
        nama: updateDosenPembimbingMagang.nama,
        prodi: updateDosenPembimbingMagang.prodi,
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
