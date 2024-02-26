import { Injectable } from '@nestjs/common';
import { CreateDosenPembimbingMagangDto } from 'src/generated/nestjs-dto/create-dosenPembimbingMagang.dto';
import { DosenPembimbingMagang } from 'src/generated/nestjs-dto/dosenPembimbingMagang.entity';
import { User } from 'src/generated/nestjs-dto/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DosenPembimbingMagangService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.dosenPembimbingMagang.findMany({
      select: {
        userId: true,
        nip: true,
        nama: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        userId: 'asc',
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} dosenPembimbingMagang`;
  }

  async update(nip: string, dosenPembimbingMagang: DosenPembimbingMagang) {
    const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
      where: {
        nip: nip,
      },
    });

    if(!dosen){
      return {
        status: 'error',
        message: 'Data Dosen Tidak Ditemukan',
      };
    }

    const updatedDosen = await this.prisma.dosenPembimbingMagang.update({
      where: {
        nip: nip,
      },
      data: {
        nip: dosenPembimbingMagang.nip,
        nama: dosenPembimbingMagang.nama,
        user: {
          update: {
            email: dosenPembimbingMagang.user.email,
          },
        },
      },
      select: {
        userId: true,
        nip: true,
        nama: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Diubah',
      data: updatedDosen,
    };
  }

  async remove(nip: string) {
    const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
      where: {
        nip: nip,
      },
    });

    if(!dosen){
      return {
        status: 'error',
        message: 'Data Dosen Tidak Ditemukan',
      };
    }

    await this.prisma.dosenPembimbingMagang.delete({
      where: {
        nip: nip,
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Dihapus',
    };
  }

  async create(dosenPembimbingMagang: DosenPembimbingMagang) {
    const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
      where: {
        nip: dosenPembimbingMagang.nip,
      },
    });

    if (dosen) {
      return {
        status: 'error',
        message: 'Data Dosen Sudah Ada',
      };
    }

    const hashedPassword = await bcrypt.hash(dosenPembimbingMagang.user.password, 10);

    const dosenBaru = await this.prisma.dosenPembimbingMagang.create({
      data: {
        nip: dosenPembimbingMagang.nip,
        nama: dosenPembimbingMagang.nama,
        prodi: dosenPembimbingMagang.prodi,
        user: {
          create: {
            email: dosenPembimbingMagang.user.email,
            password: hashedPassword,
          },
        },
      },
      select: {
        userId: true,
        nip: true,
        nama: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return {
      status: 'success',
      message: 'Data Dosen Berhasil Ditambahkan',
      data: dosenBaru,
    };
  }

  async findAllMahasiswaBimbingan(nip: string) {
    const dosen = await this.prisma.dosenPembimbingMagang.findUnique({
      where: {
        nip: nip,
      },
    });

    if(!dosen){
      return {
        status: 'error',
        message: 'Data Dosen Tidak Ditemukan',
      };
    }

    const daftarMahasiswa = await this.prisma.mahasiswa.findMany({
      where: {
        dosenPembimbingMagang: {
          nip: nip,
        },
      },
      select: {
        userId: true,
        nim: true,
        nama: true,
        kelas: true,
        pembimbingLapangan: {
          select: {
            nama: true,
          },
        },
        dosenPembimbingMagang: {
          select: {
            nama: true,
          },
        },
        satker: {
          select: {
            nama: true,
          },
        },
        alamat: true,
      },
      orderBy: {
        userId: 'asc',
      },
    });

    return {
      status: 'success',
      message: 'Data Mahasiswa Berhasil Diambil',
      data: daftarMahasiswa,
    };
  }
}
