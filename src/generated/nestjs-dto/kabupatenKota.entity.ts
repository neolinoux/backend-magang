
import {Provinsi} from './provinsi.entity'
import {Satker} from './satker.entity'


export class KabupatenKota {
  kabupatenKotaId: number ;
kodeKabupatenKota: string  | null;
provinsi?: Provinsi  | null;
provinsiId: number  | null;
nama: string ;
satker?: Satker[] ;
deleted: boolean ;
}
