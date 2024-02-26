
import {AdminProvinsi} from './adminProvinsi.entity'
import {Mahasiswa} from './mahasiswa.entity'


export class Satker {
  satkerId: number ;
nama: string ;
kode: string ;
alamat: string ;
email: string ;
adminProvinsi?: AdminProvinsi ;
adminProvinsiId: number ;
mahasiswa?: Mahasiswa[] ;
deleted: boolean ;
}
