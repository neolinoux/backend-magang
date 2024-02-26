
import {User} from './user.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {Satker} from './satker.entity'
import {IzinBimbinganSkripsi} from './izinBimbinganSkripsi.entity'
import {BimbinganDosen} from './bimbinganDosen.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'
import {Presensi} from './presensi.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'
import {PenilaianBimbingan} from './penilaianBimbingan.entity'
import {PenilaianLaporanDosen} from './penilaianLaporanDosen.entity'
import {PenilaianKinerja} from './penilaianKinerja.entity'
import {PenilaianLaporanPemlap} from './penilaianLaporanPemlap.entity'
import {IzinPresensi} from './izinPresensi.entity'


export class Mahasiswa {
  nim: string ;
user?: User ;
userId: number ;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
nipDosen: string  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
nipPemlap: string  | null;
satker?: Satker  | null;
kodeSatker: string  | null;
nama: string  | null;
alamat: string  | null;
prodi: string  | null;
kelas: string  | null;
nomorRekening: string  | null;
izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
bimbinganDosen?: BimbinganDosen[] ;
kegiatanHarian?: KegiatanHarian[] ;
presensi?: Presensi[] ;
tipeKegiatan?: TipeKegiatan[] ;
rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
penilaianBimbingan?: PenilaianBimbingan  | null;
penilaianLaporanDosen?: PenilaianLaporanDosen  | null;
penilaianKinerja?: PenilaianKinerja  | null;
penilaianLaporanPemlap?: PenilaianLaporanPemlap  | null;
izinPresensi?: IzinPresensi[] ;
deleted: boolean ;
}
