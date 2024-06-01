
import {User} from './user.entity'
import {KapasitasSatkerTahunAjaran} from './kapasitasSatkerTahunAjaran.entity'


export class TahunAjaran {
  tahunAjaranId: number ;
  tahun: string ;
  isActive: boolean ;
  user?: User[] ;
  kapasitasSatkerTahunAjaran?: KapasitasSatkerTahunAjaran[] ;
}
