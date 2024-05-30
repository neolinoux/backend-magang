
import {User} from './user.entity'
import {Satker} from './satker.entity'
import {Mahasiswa} from './mahasiswa.entity'


export class PembimbingLapangan {
  pemlapId: number ;
nip: string ;
nama: string ;
user?: User ;
userId: number ;
satker?: Satker ;
satkerId: number ;
mahasiswa?: Mahasiswa[] ;
}
