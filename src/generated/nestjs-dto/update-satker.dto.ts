import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class provinsi {
  @IsString()
  kodeProvinsi: string;
}

class kabupatenKota {
  @IsString()
  nama: string;
  
  @IsString()
  kodeKabupatenKota: string;
}

class kapasitasSatkerTahunAjaran {
  @IsNumber()
  kapasitas: number;

  @IsNumber()
  kapasitasId: number;
}

export class UpdateSatkerDto {
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  alamat?: string;

  @ValidateNested({ each: true })
  @Type(() => provinsi)
  provinsi: provinsi;
  
  @ValidateNested({ each: true })
  @Type(() => kabupatenKota)
  kabupatenKota: kabupatenKota;
  
  @ValidateNested({ each: true })
  @Type(() => kapasitasSatkerTahunAjaran)
  kapasitasSatkerTahunAjaran: kapasitasSatkerTahunAjaran;
}
