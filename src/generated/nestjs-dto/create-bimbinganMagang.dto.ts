import { PesertaBimbinganMahasiswa } from "./pesertaBimbinganMahasiswa.entity";






export class CreateBimbinganMagangDto {
  tanggal: Date;
  status: string;
  tempat?: string;
  pesertaBimbinganMahasiswa: PesertaBimbinganMahasiswa;
}
