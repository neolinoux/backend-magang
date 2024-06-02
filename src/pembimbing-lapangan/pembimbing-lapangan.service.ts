import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePembimbingLapanganDto } from 'src/generated/nestjs-dto/create-pembimbingLapangan.dto';
import { UpdatePembimbingLapanganDto } from 'src/generated/nestjs-dto/update-pembimbingLapangan.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class PembimbingLapanganService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAllPemlapBy(
    params: {
      nip: string,
      tahunAjaran: string,
    }
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'PembimbingLapangan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data pembimbing lapangan');
    }

    const data = await this.prisma.pembimbingLapangan.findMany({
      where: {
        AND: [accessibleBy(ability).PembimbingLapangan],
        nip: params.nip,
        user: {
          tahunAjaran: {
            tahun: params.tahunAjaran,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Diambil',
      data: data,
    };
  }

  async create(createPembimbingLapangan: CreatePembimbingLapanganDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'PembimbingLapangan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan data pembimbing lapangan');
    }

    const hashedPassword = await bcrypt.hash(createPembimbingLapangan.user.password, 10);

    const pembimbingLapanganBaru = await this.prisma.pembimbingLapangan.create({
      data: {
        nip: createPembimbingLapangan.nip,
        nama: createPembimbingLapangan.nama,
        user: {
          create: {
            email: createPembimbingLapangan.user.email,
            password: hashedPassword,
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                })).tahunAjaranId
              },
            },
            userRoles: {
              create: {
                roleId: 4,
              },
            },
          },
        },
        satker: {
          connect: {
            kodeSatker: createPembimbingLapangan.satker.kodeSatker,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Ditambahkan',
      data: pembimbingLapanganBaru,
    };
  }

  async update(
    pemlapId: number,
    updatePembimbingLapangan: UpdatePembimbingLapanganDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PembimbingLapangan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data pembimbing lapangan');
    }

    await this.prisma.pembimbingLapangan.findFirstOrThrow({
      where: {
        pemlapId: pemlapId,
        AND: [accessibleBy(ability).PembimbingLapangan],
      },
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data pembimbing lapangan ini');
    });

    const data = await this.prisma.pembimbingLapangan.update({
      where: {
        pemlapId: pemlapId,
      },
      data: {
        nip: updatePembimbingLapangan.nip || undefined,
        nama: updatePembimbingLapangan.nama || undefined,
        user: {
          update: {
            email: updatePembimbingLapangan.email || undefined,
          },
        }
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Diubah',
      data: data,
    };
  }

  async remove(pemlapId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('remove', 'PembimbingLapangan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus data pembimbing lapangan');
    }

    await this.prisma.pembimbingLapangan.findFirstOrThrow({
      where: {
        pemlapId: pemlapId,
        AND: [accessibleBy(ability).PembimbingLapangan],
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus data pembimbing lapangan ini');
    });

    await this.prisma.pembimbingLapangan.delete({
      where: {
        pemlapId: pemlapId,
      },
    });

    return {
      status: 'success',
      message: 'Data Pembimbing Lapangan Berhasil Dihapus'
    };
  }
}
