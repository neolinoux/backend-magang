import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as XLSX from 'xlsx';
import { connect } from 'http2';
import { CreateSatkerBulkDto } from 'src/generated/nestjs-dto/create-satkerBulk.dto';


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
        kodeSatker: data[i].kodeKabupatenKota.toString(),
        provinsi: {
          connect: {
            kodeProvinsi: data[i].kodeProvinsi.toString(),
          }
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
                }
              }
            }
          }
        },
        internalBPS: data[i].internalBPS.toString() === '1' ? true : false,
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

  if (satker.internalBPS.toString() === '1') {
    satkerBaru = await this.prisma.satker.create({
      data: {
        nama: satker.nama,
        email: satker.email,
        alamat: satker.alamat,
        kodeSatker: satker.kabupatenKota.kodeKabupatenKota,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi,
          },
        },
        adminProvinsi: {
          connect: {
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
        internalBPS: true,
      },
    });
  } else {
    satkerBaru = await this.prisma.satker.create({
      data: {
        nama: satker.nama,
        email: satker.email,
        alamat: satker.alamat,
        kodeSatker: satker.kabupatenKota.kodeKabupatenKota,
        provinsi: {
          connect: {
            kodeProvinsi: satker.provinsi.kodeProvinsi, // perhatikan kodeProvinsi karna ini external BPS maka buat kodeProvinsi sendiri yang membedakan dengan internal BPS dan satker level provinsi lainnya
          },
        },
        adminProvinsi: {
          connect: {
            provinsiId: (await this.prisma.provinsi.findFirst({
              where: {
                kodeProvinsi: satker.provinsi.kodeProvinsi,
              },
              select: {
                provinsiId: true,
              },
            })).provinsiId,
          },
        },
        kabupatenKota: {
          connect: {
            kodeKabupatenKota: satker.kabupatenKota.kodeKabupatenKota,
          },
        },
        adminSatker: {
          create: {
            user: {
              create: {
                email: satker.adminSatker.email,
                password: await bcrypt.hash(satker.adminSatker.password, 10),
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
          }
        },
        internalBPS: false,
      },
    });
  }
    
  return {
    status: 'success',
    message: 'Data Satuan Kerja Berhasil Ditambahkan',
    data: satkerBaru,
  }
  }

  async findOne(kode: string) {
    const satker = await this.prisma.satker.findUnique({
      where: {
        kodeSatker: kode,
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
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: satker,
    }
  }

  async update(satkerId: number, satker: UpdateSatkerDto) {
    try {
      const cekSatker = await this.prisma.satker.findUnique({
        where: {
          satkerId: satkerId,
        },
      });
  
      if (!cekSatker) {
        return {
          status: 'error',
          message: 'Data Satuan Kerja Tidak Ditemukan',
        }
      }
  
      const updateSatker = await this.prisma.satker.update({
        where: {
          satkerId: satkerId,
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
          kodeSatker: satker.kodeSatker,
          kapasitasSatkerTahunAjaran: {
            update: {
              data: {
                kapasitas: satker.kapasitasSatkerTahunAjaran.kapasitas,
              },
              where: {
                kapasitasId: satker.kapasitasSatkerTahunAjaran.kapasitasId,
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
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Data Satuan Kerja Gagal Diubah',
        error: error,
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async remove(satkerId: number) {
    try {
      const cekSatker = await this.prisma.satker.findFirstOrThrow({
        where: {
          satkerId: satkerId,
        },
      });
  
      const deleteSatker = await this.prisma.satker.delete({
        where: {
          satkerId: satkerId,
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
        message: 'Data Satuan Kerja Berhasil Dihapus',
        data: deleteSatker,
      }
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Data Satuan Kerja Gagal Dihapus',
        error: error,
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
