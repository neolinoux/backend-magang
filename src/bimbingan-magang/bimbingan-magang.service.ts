import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateBimbinganMagangDto } from 'src/generated/nestjs-dto/create-bimbinganMagang.dto';
import { UpdateBimbinganMagangDto } from 'src/generated/nestjs-dto/update-bimbinganMagang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateBimbinganMagangDosenDto } from 'src/generated/nestjs-dto/create-BimbinganMagangDosen.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class BimbinganMagangService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
    ) { }
    
  async createByMahasiswa(mahasiswaId: number, createBimbinganMagangDto: CreateBimbinganMagangDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'BimbinganMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat bimbingan magang');
    }

    const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
      data: {
        tanggal: new Date(createBimbinganMagangDto.tanggal),
        status: "Menunggu",
        tempat: createBimbinganMagangDto.tempat === undefined ? null : createBimbinganMagangDto.tempat,
        PesertaBimbinganMahasiswa: {
          create: {
            mahasiswa: {
              connect: {
                mahasiswaId: mahasiswaId
              }
            },
          }
        },
        dosenPembimbingMagang: {
          connect: {
            dosenId: (
              await this.prismaService.mahasiswa.findUnique({
                  where: {
                    mahasiswaId: mahasiswaId
                  }
                })
              ).dosenId
          }
        }
      },
    });

    return {
      status: "success",
      message: "Bimbingan Magang Berhasil Ditambahkan",
      data: bimbinganMagang
    }
  }

  async createByDosenPembimbing(
    dosenId: number,
    createBimbinganMagangDto: CreateBimbinganMagangDosenDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'BimbinganMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat bimbingan magang');
    }

    // create tanpa peserta dulu
    const bimbinganMagang = await this.prismaService.bimbinganMagang.create({
      data: {
        tanggal: new Date(createBimbinganMagangDto.tanggal),
        status: "Menunggu",
        tempat: createBimbinganMagangDto.tempat === undefined ? null : createBimbinganMagangDto.tempat,
        dosenPembimbingMagang: {
          connect: {
            dosenId: dosenId
          }
        },
        PesertaBimbinganMahasiswa: {
          create: createBimbinganMagangDto.pesertaBimbinganMahasiswa.map((peserta) => ({
            mahasiswa: {
              connect: {
                mahasiswaId: peserta.mahasiswaId
              }
            }
          }))
        }
      },
    });

    return {
      status: "success",
      message: "Bimbingan Magang Berhasil Ditambahkan",
      data: bimbinganMagang
    }
  }

  async findAllBimbinganMagangBy(
    query: {
      nim: string;
      nipDosen: string;
      tanggal: Date;
      status: string;
    }
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'BimbinganMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat bimbingan magang');
    }

    const listBimbinganMagang = await this.prismaService.bimbinganMagang.findMany({
      where: {
        AND: [
          accessibleBy(ability).BimbinganMagang,
          {
            dosenPembimbingMagang: {
              nip: {
                contains: query.nipDosen
              }
            },
            PesertaBimbinganMahasiswa: {
              some: {
                mahasiswa: {
                  nim: {
                    contains: query.nim
                  }
                }
              }
            },
            tanggal: query.tanggal === undefined ? undefined : new Date(query.tanggal),
            status: {
              contains: query.status
            },
          }
        ],
      },
    });
    
    return {
      status: "success",
      message: "Data Bimbingan Magang Berhasil Diambil",
      data: listBimbinganMagang
    }
  }

  async update(bimbinganMagangId: number, updateBimbinganMagangDto: UpdateBimbinganMagangDto) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'BimbinganMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah bimbingan magang');
    }

    await this.prismaService.bimbinganMagang.findFirstOrThrow({
      where: {
        bimbinganId: bimbinganMagangId,
        AND: [accessibleBy(ability).BimbinganMagang]
      }
    }).catch(() => {
      throw new ForbiddenException('Bimbingan Magang tidak ditemukan');
    });

    const bimbinganMagang = await this.prismaService.bimbinganMagang.update({
      where: {
        bimbinganId: bimbinganMagangId
      },
      data: {
        tanggal: new Date(updateBimbinganMagangDto.tanggal),
        tempat: updateBimbinganMagangDto.tempat
      }
    });

    return {
      status: "success",
      message: "Bimbingan Magang Berhasil Diubah",
      data: bimbinganMagang
    }
  }

  async confirm(bimbinganId: number) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'BimbinganMagang')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk membuat bimbingan magang');
    }

    await this.prismaService.bimbinganMagang.findFirstOrThrow({
      where: {
        bimbinganId: bimbinganId,
        AND: [accessibleBy(ability).BimbinganMagang]
      }
    }).catch(() => {
      throw new ForbiddenException('Bimbingan Magang tidak ditemukan');
    });

    const bimbinganMagang = await this.prismaService.bimbinganMagang.update({
      where: {
        bimbinganId: bimbinganId
      },
      data: {
        status: "Disetujui",
      }
    });
    
    return {
      status: "success",
      message: "Bimbingan Magang Berhasil Disetujui",
      data: bimbinganMagang
    }
  }
}
