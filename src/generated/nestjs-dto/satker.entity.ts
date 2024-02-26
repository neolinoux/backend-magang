
import {AdminProvinsi} from './adminProvinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Mahasiswa} from './mahasiswa.entity'


export class Satker {
  satkerId: number ;
kode: string ;
adminProvinsi?: AdminProvinsi  | null;
adminProvinsiId: number  | null;
kabupatenKota?: KabupatenKota  | null;
kabupatenKotaId: number  | null;
nama: string ;
email: string ;
alamat: string  | null;
mahasiswa?: Mahasiswa[] ;
kapasitas: number  | null;
deleted: boolean ;
}
