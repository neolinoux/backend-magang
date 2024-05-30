
import {User} from './user.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {BimbinganMagang} from './bimbinganMagang.entity'


export class DosenPembimbingMagang {
  dosenId: number ;
nip: string ;
nama: string ;
prodi: string ;
user?: User ;
userId: number ;
createdAt: Date ;
updatedAt: Date ;
mahasiswa?: Mahasiswa[] ;
bimbinganMagang?: BimbinganMagang[] ;
}
