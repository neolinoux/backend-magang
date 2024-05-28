
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {TahunAjaran} from './tahunAjaran.entity'


export class TahunAjaranDosen {
  tahunAjaranDosenId: number ;
dosen?: DosenPembimbingMagang ;
dosenId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
