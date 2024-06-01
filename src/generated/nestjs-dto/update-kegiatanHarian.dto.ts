import { IsDateString, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { TipeKegiatan } from "./tipeKegiatan.entity";

export class UpdateKegiatanHarianDto {
  @IsOptional()
  @IsDateString()
  tanggal?: Date;

  @IsString()
  @IsOptional()
  deskripsi?: string;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  durasi?: number;

  @IsOptional()
  @IsNumber()
  statusPenyelesaian?: number;

  @IsOptional()
  @IsString()
  satuan?: string;

  @IsOptional()
  @IsString()
  pemberiTugas?: string;

  @IsOptional()
  tipeKegiatan?: TipeKegiatan;
}
