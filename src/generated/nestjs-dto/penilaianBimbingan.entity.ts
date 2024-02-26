
import {Mahasiswa} from './mahasiswa.entity'


export class PenilaianBimbingan {
  penilaianId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
deleted: boolean ;
}
