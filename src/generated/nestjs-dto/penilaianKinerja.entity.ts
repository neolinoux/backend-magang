
import {Mahasiswa} from './mahasiswa.entity'


export class PenilaianKinerja {
  penilaianId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
