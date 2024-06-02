import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/create-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/update-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananTipeKegiatan } from 'src/generated/nestjs-dto/update-rekapKegiatanBulananTipeKegiatan.dto';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class KegiatanBulananService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async create(
    mahasiswaId: number,
    createRekapKegiatanBulananDto: CreateRekapKegiatanBulananDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'RekapKegiatanBulanan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan data rekap kegiatan bulanan');
    }

    // find all kegiatan harian in period of time from tanggalAwal to tanggalAkhir
    const kegiatanHarians = await this.prismaService.kegiatanHarian.findMany({
      where: {
        AND: [
          accessibleBy(ability).KegiatanHarian,
          {
            tanggal: {
              gte: new Date(createRekapKegiatanBulananDto.tanggalAwal)
            }
          },
          {
            tanggal: {
              lte: new Date(createRekapKegiatanBulananDto.tanggalAkhir)
            }
          }
        ],
        mahasiswaId: mahasiswaId
      }
    });

    // sum every kegiatan harian volume per tipe kegiatan
    const kegiatanHariansGrouped = kegiatanHarians.reduce((acc, kegiatanHarian) => {
      if (acc[kegiatanHarian.tipeKegiatanId] === undefined) {
        acc[kegiatanHarian.tipeKegiatanId] = 0;
      }

      acc[kegiatanHarian.tipeKegiatanId] += kegiatanHarian.volume;

      return acc;
    }, {});

    // create rekap kegiatan bulanan and connect every tipe kegiatan
    const rekapKegiatanBulanan = await this.prismaService.rekapKegiatanBulanan.create({
      data: {
        tanggalAwal: new Date(createRekapKegiatanBulananDto.tanggalAwal),
        tanggalAkhir: new Date(createRekapKegiatanBulananDto.tanggalAkhir),
        mahasiswa: {
          connect: {
            mahasiswaId: mahasiswaId
          }
        },
        RekapKegiatanBulananTipeKegiatan: {
          create: await Promise.all(Object.keys(kegiatanHariansGrouped).map(async (tipeKegiatanId) => ({
            uraian: (
              (await this.prismaService.tipeKegiatan.findUnique({
                where: {
                  tipeKegiatanId: parseInt(tipeKegiatanId)
                }
              })).nama
            ),
            tipeKegiatan: {
              connect: {
                tipeKegiatanId: parseInt(tipeKegiatanId)
              }
            },
            target: kegiatanHariansGrouped[tipeKegiatanId]
          })
          ))
        }
      }
    });

    return {
      status: 'success',
      message: 'Data Rekap Kegiatan Bulanan Berhasil Ditambahkan',
      data: rekapKegiatanBulanan
    }
  }

  async findAllRekapKegiatanBulananBy(
    query: {
      mahasiswaId?: number;
      tanggalAwal?: string;
      tanggalAkhir?: string;
    }) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'RekapKegiatanBulanan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data rekap kegiatan bulanan');
    }
    
    const data = await this.prismaService.rekapKegiatanBulanan.findMany({
      where: {
        AND: [
          accessibleBy(ability).RekapKegiatanBulanan,
          {
            tanggalAwal: {
              gte: query.tanggalAwal === '' ? undefined : new Date(query.tanggalAwal)
            }
          },
          {
            tanggalAkhir: {
              lte: query.tanggalAkhir === '' ? undefined : new Date(query.tanggalAkhir)
            }
          },
          {
            mahasiswaId: query.mahasiswaId.toString() === '' ? undefined : parseInt(query.mahasiswaId.toString())
          }
        ]
      },
      include: {
        RekapKegiatanBulananTipeKegiatan: {
          include: {
            tipeKegiatan: true
          }
        }
      }
    });

    return {
      status: 'success',
      message: 'Data Kegiatan Bulanan Berhasil Diambil',
      data: data
    }
  }

  async updateStatusRekapKegiatanBulanan(
    rekapId: number,
    updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'RekapKegiatanBulanan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah status rekap kegiatan bulanan');
    }

    await this.prismaService.rekapKegiatanBulanan.findFirstOrThrow({
      where: {
        rekapId: rekapId,
        AND: [accessibleBy(ability).RekapKegiatanBulanan]
      }
    }).catch(() => {
      throw new ForbiddenException('Rekap Kegiatan Bulanan tidak ditemukan');
    });

    const data = await this.prismaService.rekapKegiatanBulanan.update({
      where: {
        rekapId: rekapId
      },
      data: {
        isFinal: updateRekapKegiatanBulananDto.isFinal,
      }
    });

    return {
      status: 'success',
      message: 'Data Status Rekap Kegiatan Bulanan Berhasil Diubah',
      data: data
    }
  }

  async updateDetailRekapKegiatan(
    rekapTipeKegiatanId: number,
    updateRekapBulananTipeKegiatan: UpdateRekapKegiatanBulananTipeKegiatan
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'RekapKegiatanBulananTipeKegiatan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah detail data rekap kegiatan bulanan tipe kegiatan');
    }

    // cek apakah rekap kegiatan sudah final
    const idRekapKegiatanBulanan = (
      await this.prismaService.rekapKegiatanBulananTipeKegiatan.findUnique({
        where: {
          rekapTipeId: rekapTipeKegiatanId
        }
      })
    ).rekapId;

    await this.prismaService.rekapKegiatanBulanan.findFirstOrThrow({
      where: {
        rekapId: idRekapKegiatanBulanan,
        AND: [accessibleBy(ability).RekapKegiatanBulanan]
      }
    }).catch(() => {
      throw new ForbiddenException('Rekap Kegiatan Bulanan tidak ditemukan');
    });

    const rekapKegiatanBulanan = await this.prismaService.rekapKegiatanBulanan.findUnique({
      where: {
        rekapId: idRekapKegiatanBulanan
      }
    });

    if (rekapKegiatanBulanan.isFinal) {
      return {
        status: 'error',
        message: 'Data Rekap Kegiatan Bulanan Sudah Final'
      }
    }

    // update data rekap kegiatan bulanan tipe kegiatan
    const data = await this.prismaService.rekapKegiatanBulananTipeKegiatan.update({
      where: {
        rekapTipeId: rekapTipeKegiatanId
      },
      data: {
        realisasi: updateRekapBulananTipeKegiatan.realisasi,
        persentase: updateRekapBulananTipeKegiatan.realisasi / (
          await this.prismaService.rekapKegiatanBulananTipeKegiatan.findUnique({
            where: {
              rekapTipeId: rekapTipeKegiatanId
            },
          })
        ).target * 100,
        keterangan: updateRekapBulananTipeKegiatan.keterangan
      }
    });

    return {
      status: 'success',
      message: 'Data Rekap Kegiatan Bulanan Berhasil Diubah',
      data: data
    }
  }

  async remove(rekapId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('delete', 'RekapKegiatanBulanan')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menghapus data rekap kegiatan bulanan');
    }

    await this.prismaService.rekapKegiatanBulanan.findFirstOrThrow({
      where: {
        rekapId: rekapId,
        AND: [accessibleBy(ability).RekapKegiatanBulanan]
      }
    }).catch(() => {
      throw new ForbiddenException('Rekap Kegiatan Bulanan tidak ditemukan');
    });

    // cek apakah rekap kegiatan sudah final
    const rekapKegiatanBulanan = await this.prismaService.rekapKegiatanBulanan.findUnique({
      where: {
        rekapId: rekapId
      }
    });

    if (rekapKegiatanBulanan.isFinal) {
      return {
        status: 'error',
        message: 'Data Rekap Kegiatan Bulanan Sudah Final'
      }
    }

    const data = await this.prismaService.rekapKegiatanBulanan.delete({
      where: {
        rekapId: rekapId
      }
    });

    return {
      status: 'success',
      message: 'Data Rekap Kegiatan Bulanan Berhasil Dihapus',
      data: data
    }
  }
}
