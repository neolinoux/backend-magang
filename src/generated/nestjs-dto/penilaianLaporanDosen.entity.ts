
import {Mahasiswa} from './mahasiswa.entity'


export class PenilaianLaporanDosen {
  penilaianId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
deleted: boolean ;
}
