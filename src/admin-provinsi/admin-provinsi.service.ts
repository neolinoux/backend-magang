import { Injectable } from '@nestjs/common';
import { CreateAdminProvinsiDto } from './dto/create-admin-provinsi.dto';
import { UpdateAdminProvinsiDto } from './dto/update-admin-provinsi.dto';

@Injectable()
export class AdminProvinsiService {
  create(createAdminProvinsiDto: CreateAdminProvinsiDto) {
    return 'This action adds a new adminProvinsi';
  }

  findAll() {
    return `This action returns all adminProvinsi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminProvinsi`;
  }

  update(id: number, updateAdminProvinsiDto: UpdateAdminProvinsiDto) {
    return `This action updates a #${id} adminProvinsi`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminProvinsi`;
  }
}
