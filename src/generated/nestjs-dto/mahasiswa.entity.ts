
import {DosenPembimbingMagang} from './dosenPembimbingMagang.entity'
import {PembimbingLapangan} from './pembimbingLapangan.entity'
import {User} from './user.entity'
import {Satker} from './satker.entity'
import {Presensi} from './presensi.entity'
import {TipeKegiatan} from './tipeKegiatan.entity'
import {IzinPresensi} from './izinPresensi.entity'
import {KegiatanHarian} from './kegiatanHarian.entity'
import {RekapKegiatanBulanan} from './rekapKegiatanBulanan.entity'
import {IzinBimbinganSkripsi} from './izinBimbinganSkripsi.entity'
import {PesertaBimbinganMahasiswa} from './pesertaBimbinganMahasiswa.entity'

export class Mahasiswa {
  mahasiswaId?: number ;
  nim: string ;
  nama: string ;
  prodi: string ;
  kelas: string ;
  alamat: string ;
  nomorRekening: string  | null;
  dosenPembimbingMagang?: DosenPembimbingMagang  | null;
  dosenId: number  | null;
  pembimbingLapangan?: PembimbingLapangan  | null;
  pemlapId: number  | null;
  user?: User  | null;
  userId: number  | null;
  satker?: Satker  | null;
  satkerId: number  | null;
  createdAt: Date ;
  updatedAt: Date ;
  presensi?: Presensi[] ;
  tipeKegiatan?: TipeKegiatan[] ;
  izinPresensi?: IzinPresensi[] ;
  kegiatanHarian?: KegiatanHarian[] ;
  rekapKegiatanBulanan?: RekapKegiatanBulanan[] ;
  izinBimbinganSkripsi?: IzinBimbinganSkripsi[] ;
  pesertaBimbinganMagang?: PesertaBimbinganMahasiswa[] ;
}
