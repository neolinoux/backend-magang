
import {TahunAjaranDosen} from './tahunAjaranDosen.entity'
import {TahunAjaranMahasiswa} from './tahunAjaranMahasiswa.entity'
import {TahunAjaranPembimbingLapangan} from './tahunAjaranPembimbingLapangan.entity'


export class TahunAjaran {
  tahunAjaranId: number ;
tahun: string ;
isActive: boolean ;
TahunAjaranDosen?: TahunAjaranDosen[] ;
TahunAjaranMahasiswa?: TahunAjaranMahasiswa[] ;
TahunAjaranPembimbingLapangan?: TahunAjaranPembimbingLapangan[] ;
}
