import { PesertaBimbinganMagang } from "./pesertaBimbinganMagang.entity";






export class UpdateBimbinganMagangDto {
  tanggal?: Date;
status?: string;
tempat?: string;
  createdAt?: Date;
  pesertaBimbinganMagang?: PesertaBimbinganMagang[];
}
