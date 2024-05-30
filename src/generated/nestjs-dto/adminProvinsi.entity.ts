
import {User} from './user.entity'
import {Provinsi} from './provinsi.entity'
import {Satker} from './satker.entity'


export class AdminProvinsi {
  adminProvinsiId: number ;
user?: User ;
userId: number ;
provinsi?: Provinsi ;
provinsiId: number ;
satker?: Satker[] ;
}
