
import {User} from './user.entity'
import {Mahasiswa} from './mahasiswa.entity'


export class PembimbingLapangan {
  nip: string ;
user?: User ;
userId: number ;
mahasiswa?: Mahasiswa[] ;
nama: string ;
deleted: boolean ;
}
