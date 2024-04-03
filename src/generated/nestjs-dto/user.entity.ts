
import {UserRoles} from './userRoles.entity'
import {UserPermissions} from './userPermissions.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {AdminProvinsi} from './adminProvinsi.entity'
import {AdminSatker} from './adminSatker.entity'


export class User {
  userId: number ;
email: string ;
password: string ;
userRoles?: UserRoles[] ;
userPermissions?: UserPermissions[] ;
createdAt: Date  | null;
updatedAt: Date  | null;
mahasiswa?: Mahasiswa  | null;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
adminProvinsi?: AdminProvinsi  | null;
adminSatker?: AdminSatker  | null;
}
