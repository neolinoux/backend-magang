
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PesertaBimbinganMahasiswa} from './pesertaBimbinganMahasiswa.entity'


export class BimbinganMagang {
  bimbinganId: number ;
tanggal: Date ;
status: string ;
tempat: string  | null;
dosenPembimbingMagang?: DosenPembimbingMagang ;
dosenId: number ;
createdAt: Date ;
updatedAt: Date ;
PesertaBimbinganMagang?: PesertaBimbinganMahasiswa[] ;
}
