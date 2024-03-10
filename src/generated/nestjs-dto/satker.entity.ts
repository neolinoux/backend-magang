
import {AdminProvinsi} from './adminProvinsi.entity'
import {AdminSatker} from './adminSatker.entity'
import {Provinsi} from './provinsi.entity'
import {KabupatenKota} from './kabupatenKota.entity'
import {Mahasiswa} from './mahasiswa.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {SatkerPilihan} from './satkerPilihan.entity'
import { ApiProperty } from '@nestjs/swagger'


export class Satker {
  satkerId: number;
  
  @ApiProperty()
  internalBPS: boolean ;
  adminProvinsi?: AdminProvinsi  | null;
  adminProvinsiId: number  | null;
  adminSatker?: AdminSatker  | null;
  adminSatkerId: number | null;

  @ApiProperty()
  provinsi?: Provinsi;
  kodeProvinsi: string;
  
  @ApiProperty()
  kabupatenKota?: KabupatenKota;

  kodeKabupatenKota: string;
  
  @ApiProperty()
  nama: string;

  @ApiProperty()
  kode: string;

  @ApiProperty()
  email: string ;

  @ApiProperty()
  alamat: string;

  @ApiProperty()
  kapasitas: number | null;
  mahasiswa?: Mahasiswa[];
  pembimbingLapangan?: PembimbingLapangan[];
  satkerPilihan?: SatkerPilihan[];
}
