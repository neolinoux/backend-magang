import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Mahasiswa } from 'src/generated/nestjs-dto/mahasiswa.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimMagangService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request,
  ) { }
  
  async assignMahasiswaToDosenPembimbing(
    dosenId: number,
    params: Mahasiswa[]
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengassign mahasiswa ke dosen pembimbing');
    }

    await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
      where: {
        dosenId: parseInt(dosenId.toString()),
        AND:[accessibleBy(ability).DosenPembimbingMagang]
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengassign mahasiswa ke dosen pembimbing');
    });

    await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        mahasiswa: {
          connect: params.map((mahasiswa) => {
            return {
              mahasiswaId: mahasiswa.mahasiswaId,
            };
          }),
        },
      },
    });

    return {
      status: 'success',
      message: 'Mahasiswa Berhasil Diassign Ke Dosen Pembimbing',
    };
  }

  async unassignMahasiswaToDosenPembimbing(
    dosenId: number,
    params: Mahasiswa[]
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'DosenPembimbingMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menunassign mahasiswa dari dosen pembimbing');
    }

    await this.prisma.dosenPembimbingMagang.findFirstOrThrow({
      where: {
        dosenId: parseInt(dosenId.toString()),
        AND: [accessibleBy(ability).DosenPembimbingMagang]
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menunassign mahasiswa dari dosen pembimbing');
    });

    await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        mahasiswa: {
          disconnect: params.map((mahasiswa) => {
            return {
              mahasiswaId: mahasiswa.mahasiswaId,
            };
          }),
        },
      },
    });

    return {
      status: 'success',
      message: 'Mahasiswa Berhasil Diunassign Dari Dosen Pembimbing',
    };
  }
}
