
import {User} from './user.entity'
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {Satker} from './satker.entity'
import {TahunAjaranMahasiswa} from './tahunAjaranMahasiswa.entity'
import {IzinBimbinganSkripsi} from './izinBimbinganSkripsi.entity'
import {PesertaBimbinganMagang} from './pesertaBimbinganMagang.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'
import {Presensi} from './presensi.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'
import {IzinPresensi} from './izinPresensi.entity'


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
tahunAjaranMahasiswa?: TahunAjaranMahasiswa[] ;
izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
pesertaBimbinganMagang?: PesertaBimbinganMagang[] ;
kegiatanHarian?: KegiatanHarian[] ;
presensi?: Presensi[] ;
tipeKegiatan?: TipeKegiatan[] ;
rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
izinPresensi?: IzinPresensi[] ;
}
