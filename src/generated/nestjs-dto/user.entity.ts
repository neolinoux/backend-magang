
import {UserRoles} from './userRoles.entity'
import {UserPermissions} from './userPermissions.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {AdminProvinsi} from './adminProvinsi.entity'
import {AdminSatker} from './adminSatker.entity'
import { ApiProperty } from '@nestjs/swagger'


export class User {
  userId: number;
  @ApiProperty()
  email: string;
  
  @ApiProperty()
password: string ;
userRoles?: UserRoles[] ;
userPermissions?: UserPermissions[] ;
mahasiswa?: Mahasiswa  | null;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
adminProvinsi?: AdminProvinsi  | null;
adminSatker?: AdminSatker  | null;
createdAt: Date  | null;
updatedAt: Date  | null;
}
