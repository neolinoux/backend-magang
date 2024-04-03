
import {User} from './user.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {Satker} from './satker.entity'
import {TahunAjaran} from './tahunAjaran.entity'
import {IzinBimbinganSkripsi} from './izinBimbinganSkripsi.entity'
import {KelompokBimbinganMagang} from './kelompokBimbinganMagang.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'
import {Presensi} from './presensi.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'
import {IzinPresensi} from './izinPresensi.entity'
import {PilihanSatker} from './pilihanSatker.entity'


export class Mahasiswa {
  mahasiswaId: number ;
nim: string ;
satkerId: number  | null;
nama: string ;
alamat: string ;
prodi: string ;
kelas: string ;
nomorRekening: string  | null;
user?: User ;
userId: number ;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
nipDosen: string  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
nipPemlap: string  | null;
satker?: Satker  | null;
tahunAjaranId: number ;
tahunAjaran?: TahunAjaran ;
izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
kelompokBimbinganMagang?: KelompokBimbinganMagang[] ;
kegiatanHarian?: KegiatanHarian[] ;
presensi?: Presensi[] ;
tipeKegiatan?: TipeKegiatan[] ;
rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
izinPresensi?: IzinPresensi[] ;
pilihanSatker?: PilihanSatker  | null;
}
