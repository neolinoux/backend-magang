import { TipeKegiatan } from "./tipeKegiatan.entity";






export class CreateKegiatanHarianDto {
  tanggal: Date;
deskripsi: string;
volume: number;
satuan: number;
durasi: number;
pemberiTugas: string;
  createdAt?: Date;
  tipeKegiatan?: TipeKegiatan;
}
