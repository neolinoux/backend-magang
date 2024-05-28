import { TahunAjaranDosen } from "./tahunAjaranDosen.entity";
import { User } from "./user.entity";






export class CreateDosenPembimbingMagangDto {
  nip: string;
nama: string;
  prodi: string;
  user: User;
  tahunAjaranDosen: TahunAjaranDosen[];
}
