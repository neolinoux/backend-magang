import { TipeKegiatan } from "./tipeKegiatan.entity";






export class UpdateKegiatanHarianDto {
  tanggal?: Date;
deskripsi?: string;
volume?: number;
satuan?: number;
durasi?: number;
pemberiTugas?: string;
  createdAt?: Date;
  tipeKegiatan: TipeKegiatan;
}
