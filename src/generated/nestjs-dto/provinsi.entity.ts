
import {AdminProvinsi} from './adminProvinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Satker} from './satker.entity'


export class Provinsi {
  provinsiId: number ;
adminProvinsi?: AdminProvinsi  | null;
kodeProvinsi: string ;
kabupatenKota?: KabupatenKota[] ;
satker?: Satker[] ;
nama: string ;
}
