
import {TahunAjaran} from './tahunAjaran.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {AdminSatker} from './adminSatker.entity'
import {AdminProvinsi} from './adminProvinsi.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {UserRoles} from './userRoles.entity'
import {UserPermissions} from './userPermissions.entity'


export class User {
  userId: number ;
  email: string ;
  password: string ;
  tahunAjaran?: TahunAjaran ;
  tahunAjaranId: number ;
  createdAt: Date ;
  updatedAt: Date ;
  mahasiswa?: Mahasiswa  | null;
  adminSatker?: AdminSatker  | null;
  adminProvinsi?: AdminProvinsi  | null;
  pembimbingLapangan?: PembimbingLapangan  | null;
  dosenPembimbingMagang?: DosenPembimbingMagang  | null;
  userRoles?: UserRoles[] ;
  userPermissions?: UserPermissions[] ;
}
