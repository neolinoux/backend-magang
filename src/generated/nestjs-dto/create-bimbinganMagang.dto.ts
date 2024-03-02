import { Mahasiswa } from "@prisma/client";






export class CreateBimbinganMagangDto {
  tanggal: Date;
status: string;
tempat?: string;
  createdAt?: Date;
  peserta: Array<Mahasiswa>;
}
