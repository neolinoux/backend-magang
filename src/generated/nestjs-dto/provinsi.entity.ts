
import {KabupatenKota} from './kabupatenKota.entity'


export class Provinsi {
  provinsiId: number ;
kodePriovinsi: string  | null;
kabupatenKota?: KabupatenKota[] ;
nama: string ;
deleted: boolean ;
}
