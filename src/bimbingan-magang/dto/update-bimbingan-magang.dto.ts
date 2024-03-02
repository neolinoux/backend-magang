import { PartialType } from '@nestjs/swagger';
import { CreateBimbinganMagangDto } from './create-bimbingan-magang.dto';

export class UpdateBimbinganMagangDto extends PartialType(CreateBimbinganMagangDto) {}
