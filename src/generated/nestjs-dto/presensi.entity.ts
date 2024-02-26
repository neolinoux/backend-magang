
import {Mahasiswa} from './mahasiswa.entity'


export class Presensi {
  presensiId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
waktu: Date ;
keterangan: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
deleted: boolean ;
}
