import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateKegiatanHarianDto } from 'src/generated/nestjs-dto/create-kegiatanHarian.dto';
import { UpdateKegiatanHarianDto } from 'src/generated/nestjs-dto/update-kegiatanHarian.dto';
import { CreateTipeKegiatanDto } from 'src/generated/nestjs-dto/create-tipeKegiatan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTipeKegiatanDto } from 'src/generated/nestjs-dto/update-tipeKegiatan.dto';
import { REQUEST } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';
import { accessibleBy } from '@casl/prisma';
import { access } from 'fs/promises';

@Injectable()
export class KegiatanHarianService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  //  TIPE KEGIATAN
  async createTipeKegiatan(tipeKegiatan: CreateTipeKegiatanDto, mahasiswaId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'TipeKegiatan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan data tipe kegiatan');
    }

    const data = await this.prismaService.tipeKegiatan.create({
      data: {
        nama: tipeKegiatan.nama,
        satuan: tipeKegiatan.satuan,
        mahasiswa: {
          connect: {
            mahasiswaId: mahasiswaId
          }
        }
      }
    })

    return {
      status: "success",
      message: "Tipe Kegiatan Harian Berhasil Ditambahkan",
      data: data
    }
  }

  async findAllTipeKegiatan(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'TipeKegiatan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data tipe kegiatan');
    }
    
    const tipeKegiatan = await this.prismaService.tipeKegiatan.findMany({
      where: {
        AND: [
          accessibleBy(ability).TipeKegiatan,
          {
            nama: {
              contains: params.nama
            },
            satuan: {
              contains: params.satuan
            }
          }
        ]
      }
    });

    return {
      status: 'success',
      message: 'Tipe Kegiatan Berhasil Diambil',
      data: tipeKegiatan
    }
  }

  async updateTipeKegiatan(tipeKegiatanId: number, tipeKegiatan: UpdateTipeKegiatanDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'TipeKegiatan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data tipe kegiatan');
    }

    await this.prismaService.tipeKegiatan.findFirstOrThrow({
      where: {
        tipeKegiatanId: tipeKegiatanId,
        AND:[accessibleBy(ability).TipeKegiatan]
      }
    }).catch(() => {
      throw new ForbiddenException('Tipe Kegiatan tidak ditemukan');
    });

    const data = await this.prismaService.tipeKegiatan.update({
      where: {
        tipeKegiatanId: tipeKegiatanId
      },
      data: {
        nama: tipeKegiatan.nama === undefined ? undefined : tipeKegiatan.nama,
        satuan: tipeKegiatan.satuan === undefined ? undefined : tipeKegiatan.satuan
      }
    });

    return {
      status: 'success',
      message: 'Tipe Kegiatan Berhasil Diupdate',
      data: data
    }
  }

  async removeTipeKegiatan(tipeKegiatanId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'TipeKegiatan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus data tipe kegiatan');
    }

    await this.prismaService.tipeKegiatan.findFirstOrThrow({
      where: {
        tipeKegiatanId: tipeKegiatanId,
        AND: [accessibleBy(ability).TipeKegiatan]
      }
    }).catch(() => {
      throw new ForbiddenException('Tipe Kegiatan tidak ditemukan');
    });

    const tipeKegiatan = await this.prismaService.tipeKegiatan.delete({
      where: {
        tipeKegiatanId: tipeKegiatanId
      }
    });

    return {
      status: 'success',
      message: 'Tipe Kegiatan Berhasil Dihapus',
      data: tipeKegiatan
    }
  }

  // CATATAN KEGIATAN HARIAN
  async createKegiatanHarian(createKegiatanHarian: CreateKegiatanHarianDto, mahasiswaId: number) {
    const data = await this.prismaService.kegiatanHarian.create({
      data: {
        tanggal: new Date(createKegiatanHarian.tanggal),
        deskripsi: createKegiatanHarian.deskripsi,
        volume: createKegiatanHarian.volume,
        durasi: createKegiatanHarian.durasi,
        pemberiTugas: createKegiatanHarian.pemberiTugas,
        statusPenyelesaian: createKegiatanHarian.statusPenyelesaian || 0,
        tipeKegiatan: {
          connect: {
            // cek jika mahasiswa sudah memiliki tipe kegiatan, jika belum maka error
            tipeKegiatanId: (
              await this.prismaService.tipeKegiatan.findFirstOrThrow({
                where: {
                  tipeKegiatanId: createKegiatanHarian.tipeKegiatan.tipeKegiatanId,
                }
              })
            ).tipeKegiatanId
          }
        },
        mahasiswa: {
          connect: {
            mahasiswaId: mahasiswaId
          }
        }
      }
    });

    return {
      status: "success",
      message: "Kegiatan Harian Berhasil Ditambahkan",
      data: data
    }
  }

  async findAllKegiatanHarianBy(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'KegiatanHarian')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data kegiatan harian');
    }

    const kegiatanHarian = await this.prismaService.kegiatanHarian.findMany({
      where: {
        AND: [accessibleBy(ability).KegiatanHarian],
        mahasiswa: {
          nim: params.nim
        },
        tanggal: params.tanggal === undefined ? undefined : new Date(params.tanggal),
        tipeKegiatan: {
          nama: {
            contains: params.namaTipeKegiatan
          }
        },
        statusPenyelesaian: parseInt(params.statusPenyelesaian) || undefined,
        pemberiTugas: {
          contains: params.pemberiTugas
        }
      },
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Diambil',
      data: kegiatanHarian
    }
  }

  async updateKegiatanHarian(
    kegiatanHarianId: number,
    updateKegiatanHarianDto: UpdateKegiatanHarianDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'KegiatanHarian')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data kegiatan harian');
    }

    await this.prismaService.kegiatanHarian.findFirstOrThrow({
      where: {
        kegiatanId: kegiatanHarianId,
        AND: [accessibleBy(ability).KegiatanHarian]
      }
    }).catch(() => {
      throw new ForbiddenException('Kegiatan Harian tidak ditemukan');
    });

    const kegiatanHarian = await this.prismaService.kegiatanHarian.update({
      where: {
        kegiatanId: kegiatanHarianId
      },
      data: {
        tanggal: new Date(updateKegiatanHarianDto.tanggal),
        deskripsi: updateKegiatanHarianDto.deskripsi,
        volume: updateKegiatanHarianDto.volume,
        durasi: updateKegiatanHarianDto.durasi,
        pemberiTugas: updateKegiatanHarianDto.pemberiTugas,
        statusPenyelesaian: updateKegiatanHarianDto.statusPenyelesaian,
        tipeKegiatan: {
          connect: {
            tipeKegiatanId: updateKegiatanHarianDto.tipeKegiatan.tipeKegiatanId
          }
        }
      }
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Diupdate',
      data: kegiatanHarian
    }
  }

  async konfirmasiKegiatanHarian(
    kegiatanId: number,
    kegiatanHarian: UpdateKegiatanHarianDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'KegiatanHarian')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data kegiatan harian');
    }

    await this.prismaService.kegiatanHarian.findFirstOrThrow({
      where: {
        kegiatanId: kegiatanId,
        AND: [accessibleBy(ability).KegiatanHarian]
      }
    }).catch(() => {
      throw new ForbiddenException('Kegiatan Harian tidak ditemukan');
    });

    const data = await this.prismaService.kegiatanHarian.update({
      where: {
        kegiatanId: kegiatanId
      },
      data: {
        statusPenyelesaian: kegiatanHarian.statusPenyelesaian
      }
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Dikonfirmasi',
      data: data
    }
  }

  async remove(kegiatanHarianId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'KegiatanHarian')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus data kegiatan harian');
    }

    await this.prismaService.kegiatanHarian.findFirstOrThrow({
      where: {
        kegiatanId: kegiatanHarianId,
        AND: [accessibleBy(ability).KegiatanHarian]
      }
    }).catch(() => {
      throw new ForbiddenException('Kegiatan Harian tidak ditemukan');
    });

    const kegiatanHarian = await this.prismaService.kegiatanHarian.delete({
      where: {
        kegiatanId: kegiatanHarianId
      }
    });

    return {
      status: 'success',
      message: 'Kegiatan Harian Berhasil Dihapus',
      data: kegiatanHarian
    }
  }
}
