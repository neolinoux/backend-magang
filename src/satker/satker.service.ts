import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateSatkerDto } from 'src/generated/nestjs-dto/create-satker.dto';
import { Satker } from 'src/generated/nestjs-dto/satker.entity';
import { UpdateSatkerDto } from 'src/generated/nestjs-dto/update-satker.dto';
import { PrismaService } from 'src/prisma/prisma.service';


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
          kode: params.kode,
          provinsi: {
            kodeProvinsi: params.kodeProvinsi,
          },
          kabupatenKota: {
            kodeKabupatenKota: params.kodeKabupatenKota,
          },
          internalBPS: params.internalBPS,
        },
        select: {
          satkerId: true,
          nama: true,
          alamat: true,
          email: true,
          kabupatenKota: {
            select: {
              nama: true,
              kodeKabupatenKota: true,
            },
          },
          provinsi: {
            select: {
              nama: true,
              kodeProvinsi: true,
            },
          },
          kode: true,
          kapasitas: true,
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
    const cekSatker = await this.prisma.satker.findUnique({
      where: {
        kode: satker.kabupatenKota.kodeKabupatenKota,
      },
    });

    if (cekSatker) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Sudah Ada',
      }
    }
    
    let newSatker;

    if (satker.internalBPS === true) {
      newSatker = await this.prisma.satker.create({
        data: {
          nama: satker.nama,
          email: satker.email,
          alamat: satker.alamat,
          kode: satker.kabupatenKota.kodeKabupatenKota,
          provinsi: {
            connect: {
              kodeProvinsi: satker.provinsi.kodeProvinsi,
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
          kode: true,
          kapasitas: true,
        },
      });
    } else {
      newSatker = await this.prisma.satker.create({
        data: {
          nama: satker.nama,
          email: satker.email,
          alamat: satker.alamat,
          kode: satker.kode,
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
          kode: true,
          kapasitas: true,
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
        error: error.message,
      }, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async findOne(kode: string) {
    const satker = await this.prisma.satker.findUnique({
      where: {
        kode: kode,
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
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Diambil',
      data: satker,
    }
  }

  async update(kode: string, satker: UpdateSatkerDto) {
    try {
      const cekSatker = await this.prisma.satker.findUnique({
        where: {
          kode: kode,
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
          kode: kode,
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
          kode: satker.kode,
          kapasitas: satker.kapasitas,
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
          kode: true,
          kapasitas: true,
        },
      });
  
      return {
        status: 'success',
        message: 'Data Satuan Kerja Berhasil Diubah',
        data: updateSatker,
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Gagal Diubah',
        error: error.message,
      }
    }
  }

  async remove(kode: string) {
    const cekSatker = await this.prisma.satker.findUnique({
      where: {
        kode: kode,
      },
    });

    if (!cekSatker) {
      return {
        status: 'error',
        message: 'Data Satuan Kerja Tidak Ditemukan',
      }
    }

    const deleteSatker = await this.prisma.satker.delete({
      where: {
        kode: kode,
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
        kode: true,
        kapasitas: true,
      },
    });

    return {
      status: 'success',
      message: 'Data Satuan Kerja Berhasil Dihapus',
      data: deleteSatker,
    }
  }
}
