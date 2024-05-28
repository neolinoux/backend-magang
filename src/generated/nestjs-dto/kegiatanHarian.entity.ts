
import {Mahasiswa} from './mahasiswa.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'


export class KegiatanHarian {
  kegiatanId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
deskripsi: string ;
volume: number ;
satuan: string ;
durasi: number ;
pemberiTugas: string ;
statusPenyelesaian: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
tipeKegiatan?: TipeKegiatan  | null;
tipeKegiatanId: number  | null;
}
