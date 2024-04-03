import { KabupatenKota } from "./kabupatenKota.entity";
import { Provinsi } from "./provinsi.entity";






export class CreateSatkerDto {
  nama: string;
kode: string;
email: string;
alamat: string;
  kapasitas?: number;
  internalBPS?: boolean;
  provinsi: Provinsi;
  kabupatenKota: KabupatenKota;
}
