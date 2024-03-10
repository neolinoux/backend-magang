import { ApiProperty } from "@nestjs/swagger";
import { TipeKegiatan } from "./tipeKegiatan.entity";

export class UpdateKegiatanHarianDto {
  @ApiProperty()
  tanggal?: Date;
  @ApiProperty()
  deskripsi?: string;
  @ApiProperty()
  volume?: number;
  @ApiProperty()
  satuan?: number;
  @ApiProperty()
  durasi?: number;
  @ApiProperty()
  pemberiTugas?: string;
  
  createdAt?: Date;
  
  @ApiProperty()
  tipeKegiatan: TipeKegiatan;
}
