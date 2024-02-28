import { ApiProperty } from "@nestjs/swagger";
import { DosenPembimbingMagang } from "./dosenPembimbingMagang.entity";
import { IsString } from "class-validator";
import { isPromise } from "util/types";
import { PembimbingLapangan } from "./pembimbingLapangan.entity";
import { Satker } from "./satker.entity";

export class UpdateMahasiswaDto {

  nim?: string;

  nama?: string;
  
  prodi?: string;
  
  kelas?: string;
  
  @ApiProperty()
  @IsString()
  alamat?: string;
  
  @ApiProperty()
  dosenPembimbingMagang?: DosenPembimbingMagang;

  @ApiProperty()
  pembimbingLapangan?: PembimbingLapangan;

  @ApiProperty()
  satker?: Satker;

  @ApiProperty()
  nomorRekening?: string;
  
}
