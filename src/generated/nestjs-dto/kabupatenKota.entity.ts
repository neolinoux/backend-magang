
import {Provinsi} from './provinsi.entity'
import {Satker} from './satker.entity'


export class KabupatenKota {
  kabupatenKotaId: number ;
kodeKabupatenKota: string ;
provinsi?: Provinsi  | null;
kodeProvinsi: string  | null;
satker?: Satker  | null;
nama: string ;
}
