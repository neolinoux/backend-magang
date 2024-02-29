
import {User} from './user.entity'
import {TahunAjaran} from './tahunAjaran.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {BimbinganDosen} from './bimbinganDosen.entity'


export class DosenPembimbingMagang {
  dosenId: number ;
nip: string ;
user?: User ;
userId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
mahasiswa?: Mahasiswa[] ;
nama: string ;
prodi: string ;
bimbinganDosen?: BimbinganDosen[] ;
}
