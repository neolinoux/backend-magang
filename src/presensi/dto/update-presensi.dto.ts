import { PartialType } from '@nestjs/swagger';
import { CreatePresensiDto } from './create-presensi.dto';

export class UpdatePresensiDto extends PartialType(CreatePresensiDto) {}
