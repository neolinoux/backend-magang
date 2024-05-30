import { User } from "./user.entity";






export class CreateDosenPembimbingMagangDto {
  dosenId: number;
  nip: string;
  nama: string;
  prodi: string;
  user: User;
}
