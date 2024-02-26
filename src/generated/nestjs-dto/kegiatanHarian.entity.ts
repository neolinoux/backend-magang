
import {Mahasiswa} from './mahasiswa.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'


export class KegiatanHarian {
  kegiatanId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
judul: string ;
tanggal: Date ;
deskripsi: string ;
kuantitas: number ;
kualitas: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
tipeKegiatan?: TipeKegiatan ;
tipeKegiatanId: number ;
deleted: boolean ;
}
