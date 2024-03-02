
import {User} from './user.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {Satker} from './satker.entity'
import {TahunAjaran} from './tahunAjaran.entity'
import {PenilaianBimbingan} from './penilaianBimbingan.entity'
import {PenilaianLaporanDosen} from './penilaianLaporanDosen.entity'
import {PenilaianKinerja} from './penilaianKinerja.entity'
import {PenilaianLaporanPemlap} from './penilaianLaporanPemlap.entity'
import {IzinBimbinganSkripsi} from './izinBimbinganSkripsi.entity'
import {KelompokBimbinganMagang} from './kelompokBimbinganMagang.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'
import {Presensi} from './presensi.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'
import {IzinPresensi} from './izinPresensi.entity'
import {SatkerPilihan} from './satkerPilihan.entity'


export class Mahasiswa {
  mahasiswaId: number ;
nim: string ;
user?: User ;
userId: number ;
dosenPembimbingMagang?: DosenPembimbingMagang  | null;
nipDosen: string  | null;
pembimbingLapangan?: PembimbingLapangan  | null;
nipPemlap: string  | null;
satker?: Satker  | null;
tahunAjaran?: TahunAjaran ;
tahunAjaranId: number ;
satkerId: number  | null;
nama: string ;
alamat: string ;
prodi: string ;
kelas: string ;
nomorRekening: string  | null;
penilaianBimbingan?: PenilaianBimbingan  | null;
penilaianLaporanDosen?: PenilaianLaporanDosen  | null;
penilaianKinerja?: PenilaianKinerja  | null;
penilaianLaporanPemlap?: PenilaianLaporanPemlap  | null;
izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
kelompokBimbinganMagang?: KelompokBimbinganMagang[] ;
kegiatanHarian?: KegiatanHarian[] ;
presensi?: Presensi[] ;
tipeKegiatan?: TipeKegiatan[] ;
rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
izinPresensi?: IzinPresensi[] ;
satkerPilihan?: SatkerPilihan[] ;
}
