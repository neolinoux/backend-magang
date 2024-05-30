import { AdminSatker } from "./adminSatker.entity";
import { KabupatenKota } from "./kabupatenKota.entity";
import { Provinsi } from "./provinsi.entity";






export class CreateSatkerDto {
  nama: string;
  kodeSatker: string;
  email: string;
  alamat: string;
  internalBPS: boolean;
  kabupatenKota: KabupatenKota;
  provinsi: Provinsi;
  adminSatker: AdminSatker;
}
