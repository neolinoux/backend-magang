import { TahunAjaran } from "./tahunAjaran.entity";
import { User } from "./user.entity";






export class CreateDosenPembimbingMagangDto {
  nip: string;
nama: string;
  prodi: string;
  user: User;
  tahunAjaran: TahunAjaran;
}
