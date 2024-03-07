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

  findAll() {
    return `This action returns all kegiatanBulanan`;
  }

  async findRekapMahasiswa(nim: string) {
    try {
      const data = await this.prismaService.rekapKegiatanBulanan.findMany({
        where: {
          mahasiswa: {
            nim: nim
          }
        }
      });
    } catch (error) {
      
    }
  }

  update(id: number, updateRekapKegiatanBulananDto: UpdateRekapKegiatanBulananDto) {
    return `This action updates a #${id} kegiatanBulanan`;
  }

  remove(id: number) {
    return `This action removes a #${id} kegiatanBulanan`;
  }
}
