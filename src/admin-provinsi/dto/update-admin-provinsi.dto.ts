import { PartialType } from '@nestjs/swagger';
import { CreateAdminProvinsiDto } from './create-admin-provinsi.dto';

export class UpdateAdminProvinsiDto extends PartialType(CreateAdminProvinsiDto) {}
