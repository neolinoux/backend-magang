import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateSatkerBulkDto } from 'src/generated/nestjs-dto/create-satkerBulk.dto';
import { CreateKapasitasSatkerTahunAjaranDto } from 'src/generated/nestjs-dto/create-kapasitasSatkerTahunAjaran.dto';
import { CreateKapasitasSatkerTahunAjaranBulkDto } from 'src/generated/nestjs-dto/create-kapasitasSatkerTahunAjaranBulk.dto';
import { UpdateKapasitasSatkerTahunAjaranDto } from 'src/generated/nestjs-dto/update-kapasitasSatkerTahunAjaran.dto';
import { parse } from 'path';

@Injectable()
export class SatkerService {
  constructor(private prisma: PrismaService) { }

  async findAllSatkerBy(params) {
    if (params.internalBPS !== undefined) {
      params.internalBPS = params.internalBPS === 'true' || params.internalBPS === '1' ? true : false;
    }

    const daftarSatker = await this.prisma.satker.findMany({
      where: {
        kodeSatker: {
          contains: params.kodeSatker,
        },
        provinsi: {
          nama: {
            contains: params.namaProvinsi,
          },
          kodeProvinsi: {
            contains: params.kodeProvinsi,
          },
        },
        kabupatenKota: {
          nama: {
            contains: params.namaKabupatenKota,
          },
          kodeKabupatenKota: {
            contains: params.kodeKabupatenKota,
          },
        },
        alamat: {
          contains: params.alamat,
        },
        internalBPS: params.internalBPS,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: daftarSatker,
    }
  }

  async createBulk(
    data: any
  ) {
    let createSatkerDto: CreateSatkerBulkDto[] = [];
    let satker = [];

    for (let i = 0; i < data.length; i++) {
      createSatkerDto.push({
        nama: data[i].namaSatker.toString(),
        email: data[i].emailSatker.toString(),
        alamat: data[i].alamat.toString(),
        kodeSatker:  data[i].kodeProvinsi.toString()+data[i].kodeKabupatenKota.toString(),
        provinsi: {
          connect: {
            kodeProvinsi: data[i].kodeProvinsi.toString(),
          }
        },
        adminProvinsi: {
          connect: {
            provinsiId: (await this.prisma.provinsi.findFirst({
              where: {
                kodeProvinsi: data[i].kodeProvinsi.toString(),
              },
              select: {
                provinsiId: true,
              },
            })).provinsiId
          },
        },
        kabupatenKota: {
          create: {
            nama: data[i].namaKabupatenKota.toString(),
            kodeKabupatenKota: data[i].kodeKabupatenKota.toString(),
            provinsi: {
              connect: {
                kodeProvinsi: data[i].kodeProvinsi.toString(),
              }
            }
          }
        },
        adminSatker: {
          create: {
            user: {
              create: {
                email: data[i].emailSatker.toString(),
                password: await bcrypt.hash(data[i].passwordAdminSatker.toString(), 10),
                tahunAjaran: {
                  connect: {
                    tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                      where: {
                        isActive: true,
                      },
                      select: {
                        tahunAjaranId: true,
                      },
                    })).tahunAjaranId,
                  }
                },
                userRoles: {
                  create: {
                    roleId: 8,
                  }
                }
              }
            }
          }
        },
        internalBPS: data[i].internalBPS.toString() === '1' ? true : false,
        kapasitasSatkerTahunAjaran: {
          create: {
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                })).tahunAjaranId,
              },
            },
          },
        },
      });

      satker.push(
        await this.prisma.satker.create({
          data: createSatkerDto[i],
          select: {
            satkerId: true,
            nama: true,
            alamat: true,
            email: true,
            kabupatenKota: {
              select: {
                nama: true,
                provinsi: {
                  select: {
                    nama: true,
                  },
                },
              },
            },
            kodeSatker: true,
            kapasitasSatkerTahunAjaran: {
              select: {
                kapasitas: true,
                tahunAjaran: {
                  select: {
                    tahun: true,
                  },
                },
              },
            },
          },
        })
      );
    }

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: data
    }
  }

  async create(satker: CreateSatkerDto) {
    let satkerBaru;
    satkerBaru = await this.prisma.satker.create({
      data: {
        nama: satker.nama,
        email: satker.email,
        alamat: satker.alamat,
        kodeSatker: satker.provinsi.kodeProvinsi+satker.kabupatenKota.kodeKabupatenKota,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi,
          },
        },
        adminProvinsi: {
          connect: {
            // gunakan kodeProvinsi untuk mencari provinsiId untuk menghubungkan ke adminProvinsi
            provinsiId: (await this.prisma.provinsi.findFirst({
              where: {
                kodeProvinsi: satker.provinsi.kodeProvinsi,
              },
              select: {
                provinsiId: true,
              },
              })).provinsiId
          },
        },
        kabupatenKota: {
          create: {
            nama: satker.kabupatenKota.namaKabupatenKota,
            kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
            provinsi: {
              connect: {
                kodeProvinsi: satker.provinsi.kodeProvinsi,
              },
            },
          }
        },
        adminSatker: {
          create: {
            user: {
              create: {
                email: satker.adminSatker.email,
                password: await bcrypt.hash(satker.adminSatker.password, 10),
                tahunAjaran: {
                  connect: {
                    // gunakan tahun ajaran yang aktif untuk menghubungkan ke user
                    tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                      where: {
                        isActive: true,
                      },
                      select: {
                        tahunAjaranId: true,
                      },
                    })).tahunAjaranId,
                  },
                },
              },
            },
          },
        },
        internalBPS: satker.internalBPS,
        kapasitasSatkerTahunAjaran: {
          create: {
            tahunAjaran: {
              connect: {
                tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                  where: {
                    isActive: true,
                  },
                  select: {
                    tahunAjaranId: true,
                  },
                })).tahunAjaranId,
              },
            },
          },
        },
      },
    });
    
    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: satkerBaru,
    }
  }

  async findAllKapasitasSatkerBy(params) {
    const kapasitasSatker = await this.prisma.kapasitasSatkerTahunAjaran.findMany({
      where: {
        satker: {
          kodeSatker: {
            contains: params.kodeSatker,
          },
          provinsi: {
            nama: {
              contains: params.namaProvinsi,
            },
            kodeProvinsi: {
              contains: params.kodeProvinsi,
            },
          },
          kabupatenKota: {
            nama: {
              contains: params.namaKabupatenKota,
            },
            kodeKabupatenKota: {
              contains: params.kodeKabupatenKota,
            },
          },
        },
        tahunAjaran: {
          tahun: {
            contains: params.tahunAjaran,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Kapasitas Satuan Kerja Berhasil Diambil',
      data: kapasitasSatker,
    }
  }

  async update(satkerId: number, satker: UpdateSatkerDto) {
    const updateSatker = await this.prisma.satker.update({
      where: {
        satkerId: parseInt(satkerId.toString()),
      },
      data: {
        nama: satker.nama,
        alamat: satker.alamat,
        email: satker.email,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi,
          },
        },
        kabupatenKota: {
          connect: {
            kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
          },
        },
        kapasitasSatkerTahunAjaran: {
          update: {
            data: {
              kapasitas: satker.kapasitasSatkerTahunAjaran.kapasitas,
            },
            where: {
              kapasitasId: (await this.prisma.kapasitasSatkerTahunAjaran.findFirst({
                where: {
                  satkerId: parseInt(satkerId.toString()),
                  tahunAjaranId: (await this.prisma.tahunAjaran.findFirst({
                    where: {
                      isActive: true,
                    },
                    select: {
                      tahunAjaranId: true,
                    },
                  })).tahunAjaranId,
                },
                select: {
                  kapasitasId: true,
                },
              })).kapasitasId
            },
          },
        },
      },
      select: {
        satkerId: true,
        nama: true,
        alamat: true,
        email: true,
        kabupatenKota: {
          select: {
            nama: true,
            provinsi: {
              select: {
                nama: true,
              },
            },
          },
        },
        kodeSatker: true,
        kapasitasSatkerTahunAjaran: {
          select: {
            kapasitas: true,
            tahunAjaran: {
              select: {
                tahun: true,
              },
            },
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diubah',
      data: updateSatker,
    }
  }

  async updateKapasitasSatker(kapasitasSatkerId: number, kapasitasSatker: UpdateKapasitasSatkerTahunAjaranDto) {
    const updateKapasitas = await this.prisma.kapasitasSatkerTahunAjaran.update({
      where: {
        kapasitasId: parseInt(kapasitasSatkerId.toString()),
      },
      data: {
        kapasitas: kapasitasSatker.kapasitas,

      },
    });

    return {
      status: 'success',
      message: 'Data Kapasitas Satuan Kerja Berhasil Diubah',
      data: updateKapasitas,
    }
  }

  async remove(satkerId: number) {
    const deleteSatker = await this.prisma.satker.delete({
      where: {
        satkerId: satkerId,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Dihapus',
      data: deleteSatker,
    }
  }
}
