import { PesertaBimbinganMagang } from "./pesertaBimbinganMagang.entity";






export class CreateBimbinganMagangDto {
  tanggal: Date;
status: string;
tempat?: string;
  createdAt?: Date;
  pesertaBimbinganMagang: PesertaBimbinganMagang;
}
