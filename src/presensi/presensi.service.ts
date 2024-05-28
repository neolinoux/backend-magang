import { Injectable } from '@nestjs/common';
import { CreatePresensiDto } from './dto/create-presensi.dto';
import { UpdatePresensiDto } from './dto/update-presensi.dto';

@Injectable()
export class PresensiService {
  create(createPresensiDto: CreatePresensiDto) {
    return 'This action adds a new presensi';
  }

  findAll() {
    return `This action returns all presensi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presensi`;
  }

  update(id: number, updatePresensiDto: UpdatePresensiDto) {
    return `This action updates a #${id} presensi`;
  }

  remove(id: number) {
    return `This action removes a #${id} presensi`;
  }
}
