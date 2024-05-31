import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateSatkerBulkDto } from 'src/generated/nestjs-dto/create-satkerBulk.dto';
import { CreateKapasitasSatkerTahunAjaranDto } from 'src/generated/nestjs-dto/create-kapasitasSatkerTahunAjaran.dto';
import { CreateKapasitasSatkerTahunAjaranBulkDto } from 'src/generated/nestjs-dto/create-kapasitasSatkerTahunAjaranBulk.dto';

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
                }
              }
            }
          }
        },
        internalBPS: data[i].internalBPS.toString() === '1' ? true : false
      });

      console.log(createSatkerDto[i]);

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
        kodeSatker: satker.kabupatenKota.kodeKabupatenKota,
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
      },
    });
    
    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: satkerBaru,
    }
  }

  async createBulkKapasitasSatker(data: any) {
    let createKapasitasSatkerDto: CreateKapasitasSatkerTahunAjaranBulkDto[] = [];
    let kapasitasSatker = [];
    
    for (let i = 0; i < data.length; i++) {
      createKapasitasSatkerDto.push({
        satker: {
          connect: {
            satkerId: (await this.prisma.satker.findFirst({
              where: {
                kodeSatker: data[i].kodeSatker.toString(),
              },
              select: {
                satkerId: true,
              },
            })).satkerId,
          },
        },
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
        kapasitas: data[i].kapasitas,
      });

      kapasitasSatker.push(
        await this.prisma.kapasitasSatkerTahunAjaran.create({
          data: createKapasitasSatkerDto[i],
          select: {
            kapasitasId: true,
            kapasitas: true,
            satker: {
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
            },
          },
        })
      );
    }

    return {
      status: 'success',
      message: 'Kapasitas Satuan Kerja Berhasil Ditambahkan',
      data: data
    }
  }

  async createKapasitasSatker(kapasitasSatker: CreateKapasitasSatkerTahunAjaranDto) {
    const createKapasitas = await this.prisma.kapasitasSatkerTahunAjaran.create({
      data: {
        kapasitas: kapasitasSatker.kapasitas,
        satker: {
          connect: {
            satkerId: kapasitasSatker.satkerId,
          },
        },
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
    });

    return {
      status: 'success',
      message: 'Kapasitas Satuan Kerja Berhasil Ditambahkan',
      data: createKapasitas,
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
          kapasitasSatkerTahunAjaran: {
            update: {
              data: {
                kapasitas: satker.kapasitasSatkerTahunAjaran.kapasitas,
              },
              where: {
                kapasitasId: (await this.prisma.kapasitasSatkerTahunAjaran.findFirst({
                  where: {
                    satkerId: satkerId,
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
