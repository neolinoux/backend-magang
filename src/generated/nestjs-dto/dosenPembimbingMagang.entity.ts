
import {User} from './user.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {TahunAjaranDosen} from './tahunAjaranDosen.entity'
import {PesertaBimbinganMagang} from './pesertaBimbinganMagang.entity'


export class DosenPembimbingMagang {
  dosenId: number ;
nip: string ;
user?: User ;
userId: number ;
nama: string ;
prodi: string ;
mahasiswa?: Mahasiswa[] ;
tahunAjaranDosen?: TahunAjaranDosen[] ;
pesertaBimbinganMagang?: PesertaBimbinganMagang[] ;
}
