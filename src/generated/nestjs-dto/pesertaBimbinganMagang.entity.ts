
import {BimbinganMagang} from './bimbinganMagang.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'


export class PesertaBimbinganMagang {
  pesertaBimbinganMagangId: number ;
bimbingan?: BimbinganMagang ;
bimbinganId: number ;
mahasiswa?: Mahasiswa ;
mahasiswaId: number ;
dosen?: DosenPembimbingMagang ;
nipDosen: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
