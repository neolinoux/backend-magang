
import {Satker} from './satker.entity'
import {TahunAjaran} from './tahunAjaran.entity'


export class KapasitasSatkerTahunAjaran {
  kapasitasId: number ;
satker?: Satker ;
satkerId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
kapasitas: number  | null;
}
