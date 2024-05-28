import {User} from './user.entity'
import {Satker} from './satker.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {TahunAjaranPembimbingLapangan} from './tahunAjaranPembimbingLapangan.entity'

export class PembimbingLapangan {
  pemlapId: number ;
  nip?: string ;
  nama: string ;
  user?: User ;
  userId: number ;
  satker?: Satker ;
  kodeSatker: string ;
  mahasiswa?: Mahasiswa[] ;
  tahunAjaranPemlap?: TahunAjaranPembimbingLapangan[] ;
}
