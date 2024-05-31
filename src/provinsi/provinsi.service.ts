import { Injectable } from '@nestjs/common';
import { CreateProvinsiDto } from 'src/generated/nestjs-dto/create-provinsi.dto';
import { UpdateProvinsiDto } from 'src/generated/nestjs-dto/update-provinsi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvinsiService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createProvinsiDto: CreateProvinsiDto) {
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
    const provinsis = await this.prisma.provinsi.findMany({
      where: {
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

