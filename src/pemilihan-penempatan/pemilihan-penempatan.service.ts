import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PemilihanPenempatanService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAllPemilihanPenempatanBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data pemilihan penempatan');
    }

    const data = await this.prisma.pilihanSatker.findMany({
      where: {
        satkerId: params.satkerId,
        mahasiswaId: params.mahasiswaId,
        AND: [accessibleBy(ability).PilihanSatker],
      },
    });

    return {
      status: 'success',
      message: 'Data Pemilihan Penempatan Berhasil Diambil',
      data: data
    }
  }

  async confirmPemilihanPenempatan(pilihanId: number, pilihanFinal: Satker) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status pemilihan penempatan');
    });

    const confirmPilihan = await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihanFinal.satkerId,
        status: 'Diterima',
        isActive: false
      },
    });

    // ubah status pilihan lainnya menjadi 'Ditolak'
    await this.prisma.pilihanSatker.updateMany({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId,
        NOT: {
          pilihanSatkerId: confirmPilihan.pilihanSatkerId
        },
      },
      data: {
        status: 'Ditolak',
        isActive: false
      }
    });

    // connect mahasiswa dengan satker pilihan
    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: confirmPilihan.mahasiswaId
      },
      data: {
        satker: {
          connect: {
            satkerId: confirmPilihan.satkerId
          }
        }
      }
    });

    return {
      status: 'success',
      message: 'Status Pemilihan Penempatan Berhasil Diubah',
    }
  }

  async createPemilihanPenempatan(
    mahasiswaId: number,
    pilihan: Satker[]
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan pemilihan penempatan');
    }

    for (let i = 0; i < pilihan.length; i++) {
      await this.prisma.pilihanSatker.create({
        data: {
          mahasiswaId: mahasiswaId,
          satkerId: pilihan[i].satkerId,
          status: 'Menunggu',
          isActive: true
        }
      });
    }
  
    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Ditambahkan',
    }
  }

  async pindahPemilihanPenempatan(
    pilihanId: number,
    pilihan: Satker
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah pemilihan penempatan');
    });

    await this.prisma.pilihanSatker.update({
      where: {
        pilihanSatkerId: pilihanId
      },
      data: {
        satkerId: pilihan.satkerId,
        status: 'Menunggu',
        isActive: true
      }
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dipindahkan',
    }
  }

  async deletePemilihanPenempatan(pilihanId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'PilihanSatker')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus pemilihan penempatan');
    }

    await this.prisma.pilihanSatker.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).PilihanSatker],
        pilihanSatkerId: pilihanId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus pemilihan penempatan');
    });

    await this.prisma.pilihanSatker.delete({
      where: {
        pilihanSatkerId: pilihanId
      },
    });

    return {
      status: 'success',
      message: 'Pemilihan Penempatan Berhasil Dihapus'
    }
  }
}
