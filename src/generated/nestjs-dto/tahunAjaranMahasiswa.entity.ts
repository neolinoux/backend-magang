
import {Mahasiswa} from './mahasiswa.entity'
import {TahunAjaran} from './tahunAjaran.entity'


export class TahunAjaranMahasiswa {
  tahunAjaranMahasiswaId: number ;
mahasiswa?: Mahasiswa ;
mahasiswaId: number ;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
