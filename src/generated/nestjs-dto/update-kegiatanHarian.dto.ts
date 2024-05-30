import { TipeKegiatan } from "./tipeKegiatan.entity";

export class UpdateKegiatanHarianDto {
  tanggal?: Date;
  deskripsi?: string;
  volume?: number;
  durasi?: number;
  statusPenyelesaian?: number;
  satuan?: string;
  pemberiTugas?: string;
  tipeKegiatan?: TipeKegiatan;
}
