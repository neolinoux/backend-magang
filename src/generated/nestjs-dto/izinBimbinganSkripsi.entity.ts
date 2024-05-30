
import {Mahasiswa} from './mahasiswa.entity'


export class IzinBimbinganSkripsi {
  izinBimbinganId: number ;
tanggal: Date ;
keterangan: string ;
status: string ;
mahasiswa?: Mahasiswa ;
mahasiswaId: number ;
createdAt: Date ;
updatedAt: Date ;
}
