import { Mahasiswa } from "./mahasiswa.entity";






export class CreateBimbinganMagangDto {
  tanggal: Date;
status: string;
tempat?: string;
  createdAt?: Date;
  peserta: Mahasiswa[];
}
