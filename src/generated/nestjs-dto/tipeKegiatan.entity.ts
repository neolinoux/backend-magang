
import {Mahasiswa} from './mahasiswa.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'


export class TipeKegiatan {
  tipeKegiatanId: number ;
  nama: string ;
  mahasiswa?: Mahasiswa ;
  mahasiswaId: number ;
  createdAt: Date ;
  updatedAt: Date ;
  kegiatanHarian?: KegiatanHarian[] ;
}
