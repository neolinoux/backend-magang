
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {TahunAjaran} from './tahunAjaran.entity'


export class TahunAjaranPembimbingLapangan {
  tahunAjaranPemlapId: number ;
pemlap?: PembimbingLapangan ;
pemlapId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
