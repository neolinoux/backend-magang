import { IsOptional, IsString } from "class-validator";
import { DosenPembimbingMagang } from "./dosenPembimbingMagang.entity";
import { PembimbingLapangan } from "./pembimbingLapangan.entity";
import { Satker } from "./satker.entity";

export class UpdateMahasiswaDto {
  @IsString()
  alamat: string;
  
  dosenPembimbingMagang: DosenPembimbingMagang;
  
  pembimbingLapangan: PembimbingLapangan;
  
  satker: Satker;
}
