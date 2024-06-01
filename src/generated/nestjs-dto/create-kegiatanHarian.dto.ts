import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TipeKegiatan } from "./tipeKegiatan.entity";

export class CreateKegiatanHarianDto {
  @IsDateString()
  @IsNotEmpty()
  tanggal: Date;

  @IsNotEmpty()
  @IsString()
  deskripsi: string;

  @IsNotEmpty()
  @IsNumber()
  volume: number;

  @IsString()
  @IsNotEmpty()
  satuan: string;

  @IsNumber()
  @IsNotEmpty()
  durasi: number;

  @IsOptional()
  @IsNumber()
  statusPenyelesaian?: number;

  @IsString()
  @IsNotEmpty()
  pemberiTugas: string;

  tipeKegiatan: TipeKegiatan;
}
