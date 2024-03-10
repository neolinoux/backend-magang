
import { ApiProperty } from '@nestjs/swagger';
import {Provinsi} from './provinsi.entity'
import {Satker} from './satker.entity'


export class KabupatenKota {
  kabupatenKotaId: number;
  
  @ApiProperty()
  kodeKabupatenKota: string;
  
provinsi?: Provinsi  | null;
kodePriovinsi: string  | null;
satker?: Satker  | null;
nama: string ;
}
