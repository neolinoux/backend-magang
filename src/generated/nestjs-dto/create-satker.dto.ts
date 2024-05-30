import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AdminSatker } from "./adminSatker.entity";
import { KabupatenKota } from "./kabupatenKota.entity";
import { Provinsi } from "./provinsi.entity";






export class CreateSatkerDto {
  @IsNotEmpty()
  @IsString()
  nama: string;
  
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  alamat: string;

  @IsOptional()
  @IsString()
  kodeSatker: string;

  @IsNotEmpty()
  kabupatenKota: {
    namaKabupatenKota: string;
    kodeKabupatenKota: string;
  };

  provinsi: {
    kodeProvinsi: string;
  };

  adminSatker: {
    email: string;
    password: string;
  };

  @IsNotEmpty()
  @IsBoolean()
  internalBPS: boolean;
}
