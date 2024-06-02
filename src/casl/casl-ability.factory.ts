import {
  User,
  UserRoles,
  Satker,
  AdminProvinsi,
  AdminSatker,
  BimbinganMagang,
  DosenPembimbingMagang,
  IzinBimbinganSkripsi,
  IzinPresensi,
  KabupatenKota,
  KapasitasSatkerTahunAjaran,
  KegiatanHarian,
  Mahasiswa,
  PembimbingLapangan,
  PermissionRoles,
  Permissions,
  PesertaBimbinganMahasiswa,
  PilihanSatker,
  Presensi,
  Provinsi,
  RekapKegiatanBulanan,
  Roles,
  RekapKegiatanBulananTipeKegiatan,
  TahunAjaran,
  TipeKegiatan,
  UserPermissions,
} from '@prisma/client';
import { PureAbility, AbilityBuilder, subject, InferSubjects } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

//To support rule definition for all, we just need to explicitly do it:
export type AppSubjects = 'all' | Subjects<{
  UserRoles: UserRoles;
  Satker: Satker;
  User: User;
  TahunAjaran: TahunAjaran;
  AdminProvinsi: AdminProvinsi;
  AdminSatker: AdminSatker;
  BimbinganMagang: BimbinganMagang;
  DosenPembimbingMagang: DosenPembimbingMagang;
  IzinBimbinganSkripsi: IzinBimbinganSkripsi;
  IzinPresensi: IzinPresensi;
  KabupatenKota: KabupatenKota;
  KapasitasSatkerTahunAjaran: KapasitasSatkerTahunAjaran;
  KegiatanHarian: KegiatanHarian;
  Mahasiswa: Mahasiswa;
  PembimbingLapangan: PembimbingLapangan;
  PermissionRoles: PermissionRoles;
  Permissions: Permissions;
  PesertaBimbinganMahasiswa: PesertaBimbinganMahasiswa;
  PilihanSatker: PilihanSatker;
  Presensi: Presensi;
  Provinsi: Provinsi;
  RekapKegiatanBulanan: RekapKegiatanBulanan;
  Roles: Roles;
  RekapKegiatanBulananTipeKegiatan: RekapKegiatanBulananTipeKegiatan;
  TipeKegiatan: TipeKegiatan;
  UserPermissions: UserPermissions;
}>;

export type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(payload: {
    role: string;
    roleId: number;
    id: number;
  }) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    //ADMIN
    if (payload.roleId == 1){
      can('manage', 'all', 'all');
    }

    //TIM MAGANG
    if (payload.roleId == 2){
      can('manage', 'AdminProvinsi', 'all');
      can('manage', 'BimbinganMagang', 'all');
      can('manage', 'DosenPembimbingMagang', 'all');
      can('manage', 'RekapKegiatanBulanan', 'all');
      can('manage', 'RekapKegiatanBulananTipeKegiatan', 'all');
      can('manage', 'TipeKegiatan', 'all');
      can('manage', 'KegiatanHarian', 'all');
      can('manage', 'Mahasiswa', 'all');
      can('manage', 'PembimbingLapangan', 'all');
      can('manage', 'PilihanSatker', 'all');
      can('manage', 'Presensi', 'all');
      can('manage', 'Provinsi', 'all');
      can('manage', 'Satker', 'all');
      can('manage', 'TahunAjaran', 'all');
      can('manage', 'User', 'all');
      can('manage', 'UserRoles', 'all');
      can('manage', 'UserPermissions', 'all');
      can('manage', 'Roles', 'all');
      can('manage', 'Permissions', 'all');
      can('manage', 'PesertaBimbinganMahasiswa', 'all');
      can('manage', 'AdminSatker', 'all');
      can('manage', 'IzinBimbinganSkripsi', 'all');
      can('manage', 'IzinPresensi', 'all');
      can('manage', 'KabupatenKota', 'all');
      can('manage', 'KapasitasSatkerTahunAjaran', 'all');
      can('manage', 'PermissionRoles', 'all');
    }

    //DOSEN
    if (payload.roleId == 3) {
      //BIMBINGAN MAGANG
      can('manage', 'BimbinganMagang', 'all', {
        dosenPembimbingMagang: {
          userId: payload.id
        }
      });

      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')
      can('update', 'DosenPembimbingMagang', 'all', {
        userId: payload.id
      });

      //REKAP KEGIATAN BULANAN
      can('read', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          dosenPembimbingMagang: {
            userId: payload.id
          }
        }
      });

      //REKAP KEGIATAN BULANAN TIPE KEGIATAN
      can('read', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            dosenPembimbingMagang: {
              userId: payload.id
            }
          }
        }
      });

      //TIPE KEGIATAN
      can('read', 'TipeKegiatan', 'all', {
        mahasiswa: {
          dosenPembimbingMagang: {
            userId: payload.id
          }
        }
      });

      //KEGIATAN HARIAN
      can('read', 'KegiatanHarian', 'all', {
        mahasiswa: {
          dosenPembimbingMagang: {
            userId: payload.id
          }
        }
      });

      //MAHASISWA
      can('read', 'Mahasiswa', 'all', {
        dosenPembimbingMagang: {
          userId: payload.id
        }
      });

      //PEMBIMBING LAPANGAN
      can('read', 'PembimbingLapangan', 'all', {
        mahasiswa: {
          some: {
            dosenPembimbingMagang: {
              userId: payload.id
            }
          }
        }
      });

      //PRESENSI
      can('read', 'Presensi', 'all', {
        mahasiswa: {
          dosenPembimbingMagang: {
            userId: payload.id
          }
        }
      });

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //PEMLAP
    if (payload.roleId == 4) {
      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //REKAP KEGIATAN BULANAN
      can('read', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      can('update', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      //REKAP KEGIATAN BULANAN TIPE KEGIATAN
      can('read', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            pembimbingLapangan: {
              userId: payload.id
            }
          }
        }
      });

      can('update', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            pembimbingLapangan: {
              userId: payload.id
            }
          }
        }
      });

      //TIPE KEGIATAN
      can('read', 'TipeKegiatan', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      //KEGIATAN HARIAN
      can('read', 'KegiatanHarian', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      can('update', 'KegiatanHarian', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      //MAHASISWA
      can('read', 'Mahasiswa', 'all', {
        pembimbingLapangan: {
          userId: payload.id
        }
      });

      //PEMBIMBING LAPANGAN
      can('read', 'PembimbingLapangan', 'all', {
        userId: payload.id
      });

      can('update', 'PembimbingLapangan', 'all', {
        userId: payload.id
      });

      //PRESENSI
      can('read', 'Presensi', 'all', {
        mahasiswa: {
          pembimbingLapangan: {
            userId: payload.id
          }
        }
      });

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //BAU
    if (payload.roleId == 5) {
      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //MAHASISWA
      can('read', 'Mahasiswa', 'all')

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //BAAK
    if (payload.roleId == 6) {
      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //MAHASISWA
      can('read', 'Mahasiswa', 'all')

      //PRESENSI
      can('read', 'Presensi', 'all')

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //ADMIN PROVINSI
    if (payload.roleId == 7) {
      //ADMIN PROVINSI
      can('manage', 'AdminProvinsi', 'all', {
        userId: payload.id
      });

      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //REKAP KEGIATAN BULANAN
      can('read', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          satker: {
            provinsi: {
              adminProvinsi: {
                userId: payload.id
              }
            }
          }
        }
      });

      //REKAP KEGIATAN BULANAN TIPE KEGIATAN
      can('read', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            satker: {
              provinsi: {
                adminProvinsi: {
                  userId: payload.id
                }
              }
            }
          }
        }
      });

      //TIPE KEGIATAN
      can('read', 'TipeKegiatan', 'all', {
        mahasiswa: {
          satker: {
            provinsi: {
              adminProvinsi: {
                userId: payload.id
              }
            }
          }
        }
      });

      //KEGIATAN HARIAN
      can('read', 'KegiatanHarian', 'all', {
        mahasiswa: {
          satker: {
            provinsi: {
              adminProvinsi: {
                userId: payload.id
              }
            }
          }
        }
      });

      //MAHASISWA
      can('read', 'Mahasiswa', 'all', {
        satker: {
          provinsi: {
            adminProvinsi: {
              userId: payload.id
            }
          }
        }
      });

      can('update', 'Mahasiswa', ['satkerId'], {
        satker: {
          provinsi: {
            adminProvinsi: {
              userId: payload.id
            }
          }
        }
      });

      //PEMBIMBING LAPANGAN
      can('read', 'PembimbingLapangan', 'all', {
        mahasiswa: {
          some: {
            satker: {
              provinsi: {
                adminProvinsi: {
                  userId: payload.id
                }
              }
            }
          }
        }
      });

      //PILIHAN SATKER
      can('manage', 'PilihanSatker', 'all', {
        AND: [
          {
            mahasiswa: {
              satker: {
                provinsi: {
                  adminProvinsi: {
                    userId: payload.id
                  }
                }
              }
            }
          },
          {
            status: 'Menunggu'
          }
        ]
      });

      //PRESENSI
      can('read', 'Presensi', 'all', {
        mahasiswa: {
          satker: {
            provinsi: {
              adminProvinsi: {
                userId: payload.id
              }
            }
          }
        }
      });

      //KAPASITAS SATKER TAHUN AJARAN
      can('manage', 'KapasitasSatkerTahunAjaran', 'all', {
        satker: {
          provinsi: {
            adminProvinsi: {
              userId: payload.id
            }
          }
        },
        tahunAjaran: {
          isActive: true
        }
      });

      //SATKER
      can('read', 'Satker', 'all', {
        provinsi: {
          adminProvinsi: {
            userId: payload.id
          }
        }
      });

      can('update', 'Satker', ['alamat', 'nama'], {
        provinsi: {
          adminProvinsi: {
            userId: payload.id
          }
        }
      });

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //ADMIN SATKER
    if (payload.roleId == 8) {
      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //REKAP KEGIATAN BULANAN
      can('read', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          satker: {
            adminSatker: {
              userId: payload.id
            }
          }
        }
      });

      //REKAP KEGIATAN BULANAN TIPE KEGIATAN
      can('read', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            satker: {
              adminSatker: {
                userId: payload.id
              }
            }
          }
        }
      });

      //TIPE KEGIATAN
      can('read', 'TipeKegiatan', 'all', {
        mahasiswa: {
          satker: {
            adminSatker: {
              userId: payload.id
            }
          }
        }
      });

      //KEGIATAN HARIAN
      can('read', 'KegiatanHarian', 'all', {
        mahasiswa: {
          satker: {
            adminSatker: {
              userId: payload.id
            }
          }
        }
      });

      //MAHASISWA
      can('read', 'Mahasiswa', 'all', {
        satker: {
          adminSatker: {
            userId: payload.id
          }
        }
      });

      can('update', 'Mahasiswa', ['pemlapId'], {
        satker: {
          adminSatker: {
            userId: payload.id
          }
        }
      });

      //PEMBIMBING LAPANGAN
      can('manage', 'PembimbingLapangan', 'all', {
        satker: {
          adminSatker: {
            userId: payload.id
          }
        }
      });

      //PRESENSI
      can('read', 'Presensi', 'all', {
        mahasiswa: {
          satker: {
            adminSatker: {
              userId: payload.id
            }
          }
        }
      });

      //SATKER
      can('read', 'Satker', 'all', {
        adminSatker: {
          userId: payload.id
        }
      });

      //TAHUN AJARAN
      can('read', 'TahunAjaran', 'all');
    }

    //MAHASISWA
    if (payload.roleId == 9) {
      //BIMBINGAN MAGANG
      can('read', 'BimbinganMagang', 'all', {
        PesertaBimbinganMahasiswa: {
          some: {
            mahasiswa: {
              userId: payload.id
            }
          }
        }
      });
      
      can('update', 'BimbinganMagang', ['tanggal', 'tempat'], {
        AND: [
          {
            PesertaBimbinganMahasiswa: {
              some: {
                mahasiswa: {
                  userId: payload.id
                }
              }
            }
          },
          {
            status: 'Menunggu'
          }
        ]
      });

      //DOSEN PEMBIMBING MAGANG
      can('read', 'DosenPembimbingMagang', 'all')

      //REKAP KEGIATAN BULANAN
      can('manage', 'RekapKegiatanBulanan', 'all', {
        mahasiswa: {
          userId: payload.id
        }
      });
      cannot('update', 'RekapKegiatanBulanan', ['isFinal']);

      //REKAP KEGIATAN BULANAN TIPE KEGIATAN
      can('manage', 'RekapKegiatanBulananTipeKegiatan', 'all', {
        rekapKegiatan: {
          mahasiswa: {
            userId: payload.id
          }
        }
      });

      //TIPE KEGIATAN
      can('manage', 'TipeKegiatan', 'all', {
        mahasiswa: {
          userId: payload.id
        }
      });

      //MAHASISWA
      can('read', 'Mahasiswa', 'all', {
        userId: payload.id
      });

      can('update', 'Mahasiswa', ['alamat', 'nomorRekening'], {
        userId: payload.id
      });

      //PEMBIMBING LAPANGAN
      can('read', 'PembimbingLapangan', 'all', {
        mahasiswa: {
          some: {
            userId: payload.id
          }
        }
      });

      //PILIHAN SATKER
      can('manage', 'PilihanSatker', 'all', {
        AND: [
          {
            mahasiswa: {
              userId: payload.id
            }
          },
          {
            status: 'Menunggu'
          }
        ]
      });

      //PRESENSI
      can('manage', 'Presensi', 'all', {
        mahasiswa: {
          userId: payload.id
        }
      });

      //KAPASITAS SATKER TAHUN AJARAN
      can('read', 'KapasitasSatkerTahunAjaran', 'all', {
        tahunAjaran: {
          isActive: true
        }
      });

      //SATKER
      can('read', 'Satker', 'all');
    }

    return build();
  }
}