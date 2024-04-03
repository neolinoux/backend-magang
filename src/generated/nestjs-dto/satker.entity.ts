
import {AdminProvinsi} from './adminProvinsi.entity'
import {AdminSatker} from './adminSatker.entity'
import {Provinsi} from './provinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {PilihanSatker} from './pilihanSatker.entity'


export class Satker {
  satkerId: number ;
internalBPS: boolean ;
adminProvinsi?: AdminProvinsi  | null;
adminProvinsiId: number  | null;
adminSatker?: AdminSatker  | null;
adminSatkerId: number  | null;
provinsi?: Provinsi  | null;
kodeProvinsi: string  | null;
kabupatenKota?: KabupatenKota  | null;
kodeKabupatenKota: string  | null;
nama: string ;
kode: string ;
email: string ;
alamat: string ;
kapasitas: number  | null;
mahasiswa?: Mahasiswa[] ;
pembimbingLapangan?: PembimbingLapangan[] ;
pilihanSatker?: PilihanSatker  | null;
pilihanSatkerId: number  | null;
}
