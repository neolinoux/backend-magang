import { KabupatenKota } from "./kabupatenKota.entity";
import { Provinsi } from "./provinsi.entity";

export class UpdateSatkerDto {
  nama?: string;
kode?: string;
email?: string;
alamat?: string;
  kapasitas?: number;
  provinsi: Provinsi;
  kabupatenKota: KabupatenKota;
}
