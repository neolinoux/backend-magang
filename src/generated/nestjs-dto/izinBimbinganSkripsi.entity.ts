
import {Mahasiswa} from './mahasiswa.entity'


export class IzinBimbinganSkripsi {
  izinBimbinganId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
keterangan: string ;
status: boolean ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
