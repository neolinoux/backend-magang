
import {Mahasiswa} from './mahasiswa.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'


export class RekapKegiatanBulanan {
  rekapId: number ;
mahasiswa?: Mahasiswa ;
nim: string ;
periode: string ;
uraian: string ;
satuan: string ;
target: number ;
realisasi: number ;
persentase: number ;
tingkatKualitas: number  | null;
keterangan: string  | null;
kegiatanHarian?: KegiatanHarian[] ;
createdAt: Date  | null;
updatedAt: Date  | null;
}
