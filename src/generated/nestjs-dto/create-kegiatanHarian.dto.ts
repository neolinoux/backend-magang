import { TipeKegiatan } from "./tipeKegiatan.entity";






export class CreateKegiatanHarianDto {
  tanggal: Date;
  deskripsi: string;
  volume: number;
  satuan: string;
  durasi: number;
  statusPenyelesaian: number;
  pemberiTugas: string;
  tipeKegiatan: TipeKegiatan;
}
