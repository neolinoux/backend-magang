
import {PesertaBimbinganMagang} from './pesertaBimbinganMagang.entity'


export class BimbinganMagang {
  bimbinganId: number ;
tanggal: Date ;
status: string ;
tempat: string  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
nomorKelompok: number ;
PesertaBimbinganMagang?: PesertaBimbinganMagang[] ;
}
