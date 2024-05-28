
import {AdminProvinsi} from './adminProvinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Satker} from './satker.entity'


export class Provinsi {
  provinsiId: number ;
nama: string ;
kodeProvinsi: string ;
adminProvinsi?: AdminProvinsi  | null;
kabupatenKota?: KabupatenKota[] ;
satker?: Satker[] ;
}
