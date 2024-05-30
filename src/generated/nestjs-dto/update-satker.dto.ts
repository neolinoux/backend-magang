import { KabupatenKota } from "./kabupatenKota.entity";
import { KapasitasSatkerTahunAjaran } from "./kapasitasSatkerTahunAjaran.entity";
import { Provinsi } from "./provinsi.entity";






export class UpdateSatkerDto {
  nama?: string;
kodeSatker?: string;
email?: string;
  alamat?: string;
  provinsi: Provinsi;
  kabupatenKota: KabupatenKota;
  kapasitasSatkerTahunAjaran: KapasitasSatkerTahunAjaran;
}
