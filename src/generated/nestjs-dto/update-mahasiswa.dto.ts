import { DosenPembimbingMagang } from "./dosenPembimbingMagang.entity";
import { PembimbingLapangan } from "./pembimbingLapangan.entity";
import { Satker } from "./satker.entity";

export class UpdateMahasiswaDto {
  nim?: string;
  nama?: string;
  alamat?: string;
  prodi?: string;
  kelas?: string;
  nomorRekening?: string;
  dosenPembimbingMagang?: DosenPembimbingMagang;
  pembimbingLapangan?: PembimbingLapangan;
  satker?: Satker
}
