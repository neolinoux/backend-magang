import { Injectable } from '@nestjs/common';
import { CreateTahunAjaranDto } from './dto/create-tahun-ajaran.dto';
import { UpdateTahunAjaranDto } from './dto/update-tahun-ajaran.dto';

@Injectable()
export class TahunAjaranService {
  create(createTahunAjaranDto: CreateTahunAjaranDto) {
    return 'This action adds a new tahunAjaran';
  }

  findAll() {
    return `This action returns all tahunAjaran`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tahunAjaran`;
  }

  update(id: number, updateTahunAjaranDto: UpdateTahunAjaranDto) {
    return `This action updates a #${id} tahunAjaran`;
  }

  remove(id: number) {
    return `This action removes a #${id} tahunAjaran`;
  }
}
