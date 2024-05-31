import { PartialType } from '@nestjs/swagger';
import { CreateTahunAjaranDto } from './create-tahun-ajaran.dto';

export class UpdateTahunAjaranDto extends PartialType(CreateTahunAjaranDto) {}
