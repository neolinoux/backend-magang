
import {BimbinganMagang} from './bimbinganMagang.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'


export class KelompokBimbinganMagang {
  kelompokId: number ;
bimbingan?: BimbinganMagang ;
bimbinganId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
dosen?: DosenPembimbingMagang ;
nipDosen: string ;
deskripsi: string  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
