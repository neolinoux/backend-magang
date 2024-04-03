import { TipeKegiatan } from "./tipeKegiatan.entity";






export class CreateKegiatanHarianDto {
  tanggal: Date;
deskripsi: string;
volume: number;
satuan: string;
durasi: number;
pemberiTugas: string;
  createdAt?: Date;
  tipeKegiatan: TipeKegiatan;
}
