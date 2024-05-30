
import {AdminProvinsi} from './adminProvinsi.entity'
import {Satker} from './satker.entity'
import {KabupatenKota} from './kabupatenKota.entity'


export class Provinsi {
  provinsiId: number ;
nama: string ;
kodeProvinsi: string ;
adminProvinsi?: AdminProvinsi  | null;
satker?: Satker[] ;
kabupatenKota?: KabupatenKota[] ;
}
