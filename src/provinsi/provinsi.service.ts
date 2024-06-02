import { accessibleBy } from '@casl/prisma';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateProvinsiDto } from 'src/generated/nestjs-dto/create-provinsi.dto';
import { UpdateProvinsiDto } from 'src/generated/nestjs-dto/update-provinsi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvinsiService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async create(createProvinsiDto: CreateProvinsiDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'Provinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat provinsi');
    }

    const provinsi = await this.prisma.provinsi.create({
      data: {
        nama: createProvinsiDto.nama,
        kodeProvinsi: createProvinsiDto.kodeProvinsi
      }
    });

    return {
      status: 'success',
      message: 'Provinsi berhasil dibuat',
      data: provinsi
    }
  }

  async findAllProvinsiBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'Provinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat provinsi');
    }

    const provinsis = await this.prisma.provinsi.findMany({
      where: {
        AND: [accessibleBy(ability).Provinsi],
        nama: {
          contains: params.nama
        },
        kodeProvinsi: {
          contains: params.kodeProvinsi
        }
      }
    });

    return {
      status: 'success',
      message: 'Provinsi berhasil ditemukan',
      data: provinsis
    }
  }

  async update(provinsiId: number, updateProvinsiDto: UpdateProvinsiDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Provinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate provinsi');
    }

    await this.prisma.provinsi.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Provinsi],
        provinsiId: provinsiId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengupdate provinsi');
    });

    const provinsi = await this.prisma.provinsi.update({
      where: {
        provinsiId
      },
      data: {
        nama: updateProvinsiDto.nama,
        kodeProvinsi: updateProvinsiDto.kodeProvinsi
      }
    });

    return {
      status: 'success',
      message: 'Provinsi berhasil diupdate',
      data: provinsi
    }
  }

  async remove(provinsiId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'Provinsi')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus provinsi');
    }

    await this.prisma.provinsi.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Provinsi],
        provinsiId: provinsiId
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus provinsi');
    });

    const provinsi = await this.prisma.provinsi.delete({
      where: {
        provinsiId
      }
    });

    return {
      status: 'success',
      message: 'Provinsi berhasil dihapus',
      data: provinsi
    }
  }
}

