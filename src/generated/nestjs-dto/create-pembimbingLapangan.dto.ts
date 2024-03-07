import { Satker } from "./satker.entity";
import { TahunAjaran } from "./tahunAjaran.entity";
import { User } from "./user.entity";






export class CreatePembimbingLapanganDto {
  nip: string;
  nama: string;
  user: User;
  tahunAjaran: TahunAjaran;
  satker: Satker;
}
