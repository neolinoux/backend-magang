
import {AdminProvinsi} from './adminProvinsi.entity'
import {AdminSatker} from './adminSatker.entity'
import {Provinsi} from './provinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {KapasitasSatkerTahunAjaran} from './kapasitasSatkerTahunAjaran.entity'


export class Satker {
  satkerId: number ;
nama: string ;
kodeSatker: string ;
email: string ;
alamat: string ;
internalBPS: boolean ;
adminProvinsi?: AdminProvinsi ;
adminProvinsiId: number ;
adminSatker?: AdminSatker ;
adminSatkerId: number ;
provinsi?: Provinsi ;
povinsiId: number ;
kabupatenKota?: KabupatenKota ;
kabupatenKotaId: number ;
mahasiswa?: Mahasiswa[] ;
pembimbingLapangan?: PembimbingLapangan[] ;
kapasitasSatkerTahunAjaran?: KapasitasSatkerTahunAjaran[] ;
}
