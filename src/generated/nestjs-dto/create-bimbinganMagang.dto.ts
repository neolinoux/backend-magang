import { KelompokBimbinganMagang } from "./kelompokBimbinganMagang.entity";






export class CreateBimbinganMagangDto {
  tanggal: Date;
status: string;
tempat?: string;
  createdAt?: Date;
  peserta: KelompokBimbinganMagang[];
}
