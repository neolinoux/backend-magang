import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class SatkerService {
  constructor(private prisma: PrismaService) { }

  async findAllSatkerBy(params: any) {
    try {
      if (params.internalBPS !== undefined) {
        params.internalBPS = params.internalBPS === 'true' || params.internalBPS === '1' ? true : false;
      }

      const daftarSatker = await this.prisma.satker.findMany({
        where: {
          kodeSatker: {
            contains: params.kodeSatker,
          },
          provinsi: {
            kodeProvinsi: {
              contains: params.kodeProvinsi,
            },
          },
          kabupatenKota: {
            kodeKabupatenKota: {
              contains: params.kodeKabupatenKota,
            },
          },
          internalBPS: params.internalBPS,
        },
        select: {
          satkerId: true,
          kodeSatker: true,
          nama: true,
          alamat: true,
          email: true,
          provinsi: {
            select: {
              nama: true,
              kodeProvinsi: true,
            },
          },
          kabupatenKota: {
            select: {
              nama: true,
              kodeKabupatenKota: true,
            },
          },
          pembimbingLapangan: {
            select: {
              nip: true,
              nama: true,
            },
          },
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
          internalBPS: true,
        },
      });

      return {
        status: 'success',
        message: 'Data Satuan Kerja Berhasil Diambil',
        data: daftarSatker,
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Gagal Diambil',
      }
    }
  }

  async create(satker: CreateSatkerDto) {
    try {
    await this.prisma.satker.findFirstOrThrow({
      where: {
        kodeSatker: satker.kodeSatker,
      },
    });
    
    let newSatker;

    if (satker.internalBPS === true) {
      newSatker = await this.prisma.satker.create({
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
              provinsiId: satker.provinsi.provinsiId,
            },
          },
          kabupatenKota: {
            create: {
              nama: satker.kabupatenKota.nama,
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
                  email: satker.adminSatker.user.email,
                  password: await bcrypt.hash(satker.adminSatker.user.password, 10),
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
          internalBPS: satker.internalBPS,
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
    } else {
      newSatker = await this.prisma.satker.create({
        data: {
          nama: satker.nama,
          email: satker.email,
          alamat: satker.alamat,
          kodeSatker: satker.kodeSatker,
          provinsi: {
            connect: {
              kodeProvinsi: satker.provinsi.kodeProvinsi, // perhatikan kodeProvinsi karna ini external BPS maka buat kodeProvinsi sendiri yang membedakan dengan internal BPS dan satker level provinsi lainnya
            },
          },
          adminProvinsi: {
            connect: {
              provinsiId: satker.provinsi.provinsiId,
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
                  email: satker.adminSatker.user.email,
                  password: await bcrypt.hash(satker.adminSatker.user.password, 10),
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
        select: {
          satkerId: true,
          nama: true,
          alamat: true,
          email: true,
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
    }
      
    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Ditambahkan',
      data: newSatker,
    }
      
    } catch (error) {
      throw new HttpException({
        status: 'error',
        message: 'Data Satuan Kerja Gagal Ditambahkan',
        error: error,
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
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
