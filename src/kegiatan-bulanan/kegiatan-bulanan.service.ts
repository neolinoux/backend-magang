import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/create-rekapKegiatanBulanan.dto';
import { UpdateRekapKegiatanBulananDto } from 'src/generated/nestjs-dto/update-rekapKegiatanBulanan.dto';

@Injectable()
export class KegiatanBulananService {
  constructor(
    private prismaService: PrismaService
  ) { }

  create(createRekapKegiatanBulananDto: CreateRekapKegiatanBulananDto) {
    return 'This action adds a new kegiatanBulanan';
  }

  async findAll(query) {
    try {
      const data = await this.prismaService.rekapKegiatanBulanan.findMany({
        where: {
          mahasiswa: {
            OR: [
              {
                nim: {
                  contains: query.nim
                }
              },
              {
                pembimbingLapangan: {
                  nip: {
                    contains: query.nipPemlap
                  }
                }
              }
            ]
          }
        },
        select: {
          rekapId: true,
          uraian: true,
          satuan: true,
          target: true,
          realisasi: true,
          tingkatKualitas: true,
          keterangan: true
        }
      });

      return {
        status: 'success',
        message: 'Data Kegiatan Bulanan Berhasil Diambil',
        data: data
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Data Kegiatan Bulanan Gagal Diambil',
        error: error.message
      }
    }
  }

  update(id: number, updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto) {
    return `This action updates a #${id} kegiatanBulanan`;
  }

  remove(id: number) {
    return `This action removes a #${id} kegiatanBulanan`;
  }
}
