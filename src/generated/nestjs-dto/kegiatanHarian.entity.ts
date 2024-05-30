
import {Mahasiswa} from './mahasiswa.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'


export class KegiatanHarian {
  kegiatanId: number ;
tanggal: Date ;
deskripsi: string ;
volume: number ;
satuan: string ;
durasi: number ;
pemberiTugas: string ;
statusPenyelesaian: number ;
mahasiswa?: Mahasiswa ;
mahasiswaId: number ;
tipeKegiatan?: TipeKegiatan  | null;
tipeKegiatanId: number  | null;
createdAt: Date ;
updatedAt: Date ;
}
