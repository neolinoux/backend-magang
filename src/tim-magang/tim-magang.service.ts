import { Injectable } from '@nestjs/common';
import { Mahasiswa } from 'src/generated/nestjs-dto/mahasiswa.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimMagangService {
  constructor(private readonly prisma: PrismaService) { }
  
  async assignMahasiswaToDosenPembimbing(
    dosenId: number,
    params: Mahasiswa[]
  ) {
    await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        mahasiswa: {
          connect: params.map((mahasiswa) => {
            return {
              mahasiswaId: mahasiswa.mahasiswaId,
            };
          }),
        },
      },
    });

    return {
      status: 'success',
      message: 'Mahasiswa Berhasil Diassign Ke Dosen Pembimbing',
    };
  }

  async unassignMahasiswaToDosenPembimbing(
    dosenId: number,
    params: Mahasiswa[]
  ) {
    await this.prisma.dosenPembimbingMagang.update({
      where: {
        dosenId: dosenId,
      },
      data: {
        mahasiswa: {
          disconnect: params.map((mahasiswa) => {
            return {
              mahasiswaId: mahasiswa.mahasiswaId,
            };
          }),
        },
      },
    });

    return {
      status: 'success',
      message: 'Mahasiswa Berhasil Diunassign Dari Dosen Pembimbing',
    };
  }
}
