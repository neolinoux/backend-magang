import { ApiProperty } from "@nestjs/swagger";
import { DosenPembimbingMagang } from "./dosenPembimbingMagang.entity";
import { PembimbingLapangan } from "./pembimbingLapangan.entity";
import { Satker } from "./satker.entity";

export class UpdateMahasiswaDto {
  nim?: string;
  nama?: string;
  
  @ApiProperty()
alamat?: string;
prodi?: string;
kelas?: string;
  nomorRekening?: string;

  @ApiProperty()
  dosenPembimbingMagang: DosenPembimbingMagang;

  @ApiProperty()
  pembimbingLapangan: PembimbingLapangan;

  @ApiProperty()
  satker: Satker;
}
