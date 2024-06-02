import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PesertaBimbinganMahasiswa } from "./pesertaBimbinganMahasiswa.entity";

export class CreateBimbinganMagangDosenDto {
  @IsDateString()
  @IsNotEmpty()
  tanggal: Date;

  status: string;

  @IsOptional()
  @IsString()
  tempat?: string;

  pesertaBimbinganMahasiswa: PesertaBimbinganMahasiswa[];
}
