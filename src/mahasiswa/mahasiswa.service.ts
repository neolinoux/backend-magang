import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMahasiswaDto } from 'src/generated/nestjs-dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from 'src/generated/nestjs-dto/update-mahasiswa.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class MahasiswaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
    @Inject(REQUEST) private request: Request
  ) { }

  async findAll(params) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('read', 'Mahasiswa')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk melihat data mahasiswa');
    }

    if (Object.keys(params).length === 0) {
      return this.prisma.mahasiswa.findMany();
    }

    return this.prisma.mahasiswa.findMany({
      where: {
        AND: [accessibleBy(ability).Mahasiswa],
        nim: {
          contains: params.nim,
        },
        nama: {
          contains: params.nama,
        },
        kelas: {
          contains: params.kelas,
        },
        prodi: {
          contains: params.prodi,
        },
        dosenPembimbingMagang: {
          dosenId: params.dosenId,
        },
        pembimbingLapangan: {
          pemlapId: params.pemlapId,
        },
        satker: {
          satkerId: params.satkerId,
        },
        user: {
          email: {
            contains: params.email,
          },
          tahunAjaran: {
            tahun: {
              contains: params.tahunAjaran,
            },
          },
        },
      },
    });
  }

  async importExcel(
    data: any
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('create', 'Mahasiswa')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk menambahkan data mahasiswa');
    }

    let createMahasiswaDto: CreateMahasiswaDto[] = [];
    let mahasiswa = []

    const tahunAjaranAktif = await this.prisma.tahunAjaran.findFirst({
      where: {
        isActive: true,
      }
    });

    for (let i = 0; i < data.length; i++) {
      createMahasiswaDto.push({
        nim: data[i].nim.toString(),
        nama: data[i].nama.toString(),
        prodi: data[i].prodi.toString(),
        kelas: data[i].kelas.toString(),
        alamat: data[i].alamat.toString(),
        user: {
          create: {
            email: data[i].email.toString(),
            password: bcrypt.hashSync(data[i].password.toString(), 10),
            tahunAjaran: {
              connect: {
                tahunAjaranId: tahunAjaranAktif.tahunAjaranId,
              },
            },
            userRoles: {
              create: {
                roleId: 9,
              },
            },
          }
        }
      })

      mahasiswa.push(
        await this.prisma.mahasiswa.create({
          data: createMahasiswaDto[i],
          select: {
            mahasiswaId: true,
            nim: true,
            nama: true,
            prodi: true,
            kelas: true,
            alamat: true,
            user: {
              select: {
                email: true,
                tahunAjaran: {
                  select: {
                    tahun: true,
                  },
                },
              },
            },
          }
        })
      );
    }

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Ditambahkan',
      data: mahasiswa,
    };
  }

  async update(
    mahasiswaId: number,
    updateMahasiswaDto: UpdateMahasiswaDto
  ) {
    const injectedToken = this.request.headers['authorization'].split(' ')[1];
    const payload = this.jwtService.decode(injectedToken);
    const ability = this.caslAbilityFactory.createForUser(payload);

    if (!ability.can('update', 'Mahasiswa')) {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data mahasiswa');
    }

    await this.prisma.mahasiswa.findFirstOrThrow({
      where: {
        mahasiswaId: mahasiswaId,
        AND: [accessibleBy(ability).Mahasiswa],
      }
    }).catch(() => {
      throw new ForbiddenException('Anda tidak memiliki izin untuk mengubah data mahasiswa');
    });

    // cek dilakukan karna 3 field ini bersifat foreign key dan hanya bisa menerima perintah connect atau disconnect
    const cekDosenPembimbingMagang =
      (updateMahasiswaDto.dosenPembimbingMagang.dosenId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            dosenId: updateMahasiswaDto.dosenPembimbingMagang.dosenId
          }
        };
    
    const cekPembimbingLapangan = 
      (updateMahasiswaDto.pembimbingLapangan.pemlapId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            pemlapId: updateMahasiswaDto.pembimbingLapangan.pemlapId
          }
        };
    
    const cekSatker =
      (updateMahasiswaDto.satker.satkerId.toString() === '') ?
        {
          disconnect: true,
        } :
        {
          connect: {
            satkerId: updateMahasiswaDto.satker.satkerId
          }
        };

    await this.prisma.mahasiswa.update({
      where: {
        mahasiswaId: mahasiswaId,
      },
      data: {
        dosenPembimbingMagang: {
          ...cekDosenPembimbingMagang,
        },
        pembimbingLapangan: {
          ...cekPembimbingLapangan,
        },
        satker: {
          ...cekSatker,
        },
        alamat: updateMahasiswaDto.alamat,
      },
    });

    const updatedMahasiswa = await this.prisma.mahasiswa.findUnique({
      where: {
        mahasiswaId: mahasiswaId,
      },
    });

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diupdate',
      data: updatedMahasiswa,
    };
  }
}
