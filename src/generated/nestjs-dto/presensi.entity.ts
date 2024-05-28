
import {Mahasiswa} from './mahasiswa.entity'


export class Presensi {
  presensiId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
waktuDatang: Date ;
waktuPulang: Date ;
status: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
