
import {Mahasiswa} from './mahasiswa.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'


export class TipeKegiatan {
  tipeKegiatanId: number ;
mahaasiswa?: Mahasiswa ;
nim: string ;
nama: string ;
kegiatanHarian?: KegiatanHarian[] ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
