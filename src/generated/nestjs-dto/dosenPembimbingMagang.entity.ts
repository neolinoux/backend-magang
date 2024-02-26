
import {User} from './user.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {BimbinganDosen} from './bimbinganDosen.entity'


export class DosenPembimbingMagang {
  nip: string ;
user?: User ;
userId: number ;
mahasiswa?: Mahasiswa[] ;
nama: string ;
prodi: string ;
bimbinganDosen?: BimbinganDosen[] ;
deleted: boolean ;
}
