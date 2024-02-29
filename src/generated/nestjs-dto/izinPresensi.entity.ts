
import {Mahasiswa} from './mahasiswa.entity'


export class IzinPresensi {
  izinId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
tanggal: Date ;
waktu: Date ;
keterangan: string ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
