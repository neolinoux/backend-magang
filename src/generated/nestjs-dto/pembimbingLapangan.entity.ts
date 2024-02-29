
import {User} from './user.entity'
import {TahunAjaran} from './tahunAjaran.entity'
import {Satker} from './satker.entity'
import {Mahasiswa} from './mahasiswa.entity'


export class PembimbingLapangan {
  pemlapId: number ;
nip: string ;
user?: User ;
userId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
satker?: Satker ;
kodeSatker: string ;
mahasiswa?: Mahasiswa[] ;
nama: string ;
}
