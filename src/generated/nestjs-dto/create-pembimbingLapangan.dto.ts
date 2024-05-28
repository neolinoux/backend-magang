import { Satker } from "./satker.entity";
import { TahunAjaranPembimbingLapangan } from "./tahunAjaranPembimbingLapangan.entity";
import { User } from "./user.entity";






export class CreatePembimbingLapanganDto {
  nip: string;
  nama: string;
  user: User;
  satker: Satker;
  tahunAjaranPemlap: TahunAjaranPembimbingLapangan;
}
