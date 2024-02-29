
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'


export class BimbinganDosen {
  bimbinganId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
dosen?: DosenPembimbingMagang ;
nipDosen: string ;
tanggal: Date ;
keterangan: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
