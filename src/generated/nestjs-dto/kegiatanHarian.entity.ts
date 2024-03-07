
import {Mahasiswa} from './mahasiswa.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'


export class KegiatanHarian {
  kegiatanId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
deskripsi: string ;
volume: number ;
satuan: number ;
durasi: number ;
pemberiTugas: string ;
statusPenyelesaian: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
tipeKegiatan?: TipeKegiatan  | null;
tipeKegiatanId: number  | null;
RekapKegiatanBulanan?: RekapKegiatanBulanan  | null;
rekapKegiatanBulananRekapId: number  | null;
}
