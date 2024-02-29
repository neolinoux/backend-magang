
import {Mahasiswa} from './mahasiswa.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'


export class TahunAjaran {
  tahunAjaranId: number ;
tahun: string ;
mahasiswa?: Mahasiswa[] ;
dosenPembimbingMagang?: DosenPembimbingMagang[] ;
pembimbingLapangan?: PembimbingLapangan[] ;
}
