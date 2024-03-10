
import { ApiProperty } from '@nestjs/swagger';
import {AdminProvinsi} from './adminProvinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Satker} from './satker.entity'


export class Provinsi {
  provinsiId: number ;
  adminProvinsi?: AdminProvinsi | null;
  
  @ApiProperty()
kodePriovinsi: string ;
kabupatenKota?: KabupatenKota[] ;
satker?: Satker[] ;
nama: string ;
}
