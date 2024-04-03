
import {Mahasiswa} from './mahasiswa.entity'
import {Satker} from './satker.entity'


export class PilihanSatker {
  pilihanSatkerId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
satker?: Satker[] ;
status: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
