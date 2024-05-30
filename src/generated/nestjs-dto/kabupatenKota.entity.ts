
import {Provinsi} from './provinsi.entity'
import {Satker} from './satker.entity'


export class KabupatenKota {
  kabupatenKotaId: number ;
kodeKabupatenKota: string ;
nama: string ;
provinsi?: Provinsi ;
provinsiId: number ;
satker?: Satker  | null;
}
