import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { parse } from 'path';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreatePresensiDto } from 'src/generated/nestjs-dto/create-presensi.dto';
import { UpdatePresensiDto } from 'src/generated/nestjs-dto/update-presensi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PresensiService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async presensiDatang(
    mahasiswaId: number,
    createPresensiDto: CreatePresensiDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'Presensi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat presensi');
    }

    const dateToday = new Date();
    dateToday.setHours(7, 30, 0, 0);

    if (new Date(createPresensiDto.waktuDatang) >= dateToday) {
      createPresensiDto.status = 'Terlambat';
    } else { 
      createPresensiDto.status = 'Tepat Waktu';
    }

    const presensi = await this.prisma.presensi.create({
      data: {
        tanggal: new Date(createPresensiDto.tanggal),
        waktuDatang: new Date(createPresensiDto.waktuDatang),
        status: createPresensiDto.status,
        mahasiswa: {
          connect: {
            mahasiswaId: mahasiswaId,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Presensi datang berhasil',
      data: presensi,
    }
  }

  async presensiPulang(
    presensiId: number,
    updatePresensiDto: UpdatePresensiDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Presensi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah presensi');
    }

    await this.prisma.presensi.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Presensi],
        presensiId: presensiId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah presensi');
    });

    const presensi = await this.prisma.presensi.update({
      where: {
        presensiId: presensiId,
      },
      data: {
        waktuPulang: new Date(updatePresensiDto.waktuPulang),
      },
    });

    return {
      status: 'success',
      message: 'Presensi pulang berhasil',
      data: presensi,
    }
  }

  async findAllPresensiBy(
    params: {
      tanggal: string;
      mahasiswaId: number;
    }
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'Presensi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat presensi');
    }

    const presensis = await this.prisma.presensi.findMany({
      where: {
        AND: [accessibleBy(ability).Presensi],
        tanggal: params.tanggal == '' ? undefined : new Date(params.tanggal),
        mahasiswaId: params.mahasiswaId.toString() == '' ? undefined : parseInt(params.mahasiswaId.toString()),
      },
    });

    return {
      status: 'success',
      message: 'Data presensi berhasil ditemukan',
      data: presensis,
    }
  }

  async remove(presensiId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'Presensi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus presensi');
    }

    await this.prisma.presensi.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Presensi],
        presensiId: presensiId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus presensi');
    });

    await this.prisma.presensi.delete({
      where: {
        presensiId: presensiId,
      },
    });

    return {
      status: 'success',
      message: 'Presensi berhasil dihapus',
    }
  }
}
