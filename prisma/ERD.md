# Shopping Mall
> Generated by [`prisma-markdown`](https://github.com/samchon/prisma-markdown)

- [default](#default)

## default
```mermaid
erDiagram
"User" {
    Int userId PK
    String email UK
    String password
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"Roles" {
    Int roleId PK
    String roleName UK
}
"Permissions" {
    Int permissionId PK
    String permissionName UK
}
"UserRoles" {
    Int id PK
    Int userId FK
    Int roleId FK
}
"PermissionRoles" {
    Int id PK
    Int roleId FK
    Int permissionId FK
}
"UserPermissions" {
    Int id PK
    Int userId FK
    Int permissionId FK
}
"TahunAjaran" {
    Int tahunAjaranId PK
    String tahun UK
}
"SatkerPilihan" {
    Int satkerPilihanId PK
    Int satkerId FK
    Int mahasiswaId FK
    String status
}
"DosenPembimbingMagang" {
    Int dosenId PK
    String nip UK
    Int userId FK
    Int tahunAjaranId FK
    String nama
    String prodi
}
"PembimbingLapangan" {
    Int pemlapId PK
    String nip UK
    Int userId FK
    Int tahunAjaranId FK
    String kodeSatker FK
    String nama
}
"PenilaianBimbingan" {
    Int penilaianId PK
    String nim FK
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"PenilaianLaporanDosen" {
    Int penilaianId PK
    String nim FK
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"PenilaianKinerja" {
    Int penilaianId PK
    String nim FK
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"PenilaianLaporanPemlap" {
    Int penilaianId PK
    String nim FK
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"Mahasiswa" {
    Int mahasiswaId PK
    String nim UK
    Int userId FK
    String nipDosen FK "nullable"
    String nipPemlap FK "nullable"
    Int tahunAjaranId FK
    Int satkerId FK "nullable"
    String nama
    String alamat
    String prodi
    String kelas
    String nomorRekening "nullable"
}
"AdminProvinsi" {
    Int adminProvinsiId PK
    Int userId FK
    String kodeProvinsi FK
}
"AdminSatker" {
    Int adminSatkerId PK
    Int userId FK
}
"Provinsi" {
    Int provinsiId PK
    String kodePriovinsi UK
    String nama UK
}
"KabupatenKota" {
    Int kabupatenKotaId PK
    String kodeKabupatenKota UK
    String kodePriovinsi FK
    String nama UK
}
"Satker" {
    Int satkerId PK
    Boolean internalBPS
    Int adminProvinsiId FK "nullable"
    Int adminSatkerId FK "nullable"
    String kodeProvinsi FK
    String kodeKabupatenKota FK
    String nama
    String kode UK
    String email
    String alamat
    Int kapasitas "nullable"
}
"IzinBimbinganSkripsi" {
    Int izinBimbinganId PK
    String nim FK
    DateTime tanggal
    String keterangan
    Boolean status
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"BimbinganMagang" {
    Int bimbinganId PK
    DateTime tanggal
    String status
    String tempat "nullable"
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
    Int nomorKelompok
}
"KelompokBimbinganMagang" {
    Int kelompokId PK
    Int bimbinganId FK
    String nim FK
    String nipDosen FK
    String deskripsi "nullable"
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"KegiatanHarian" {
    Int kegiatanId PK
    String nim FK
    DateTime tanggal
    String deskripsi
    Int volume
    Int satuan
    Int durasi
    String pemberiTugas
    Int statusPenyelesaian
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
    Int tipeKegiatanId FK "nullable"
    Int rekapKegiatanBulananRekapId FK "nullable"
}
"TipeKegiatan" {
    Int tipeKegiatanId PK
    String nim FK
    String nama
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"Presensi" {
    Int presensiId PK
    String nim FK
    DateTime tanggal
    DateTime waktu
    String keterangan
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"RekapKegiatanBulanan" {
    Int rekapId PK
    String nim FK
    String periode
    String uraian
    String satuan
    Int target
    Int realisasi
    Int persentase
    Int tingkatKualitas "nullable"
    String keterangan "nullable"
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"IzinPresensi" {
    Int izinId PK
    String nim FK
    DateTime tanggal
    DateTime waktu
    String keterangan
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"InvalidToken" {
    Int id PK
    String token UK
    DateTime createdAt "nullable"
    DateTime updatedAt "nullable"
}
"UserRoles" }o--|| "User" : user
"UserRoles" }o--|| "Roles" : role
"PermissionRoles" }o--|| "Roles" : role
"PermissionRoles" }o--|| "Permissions" : permission
"UserPermissions" }o--|| "User" : user
"UserPermissions" }o--|| "Permissions" : permission
"SatkerPilihan" }o--|| "Satker" : satker
"SatkerPilihan" }o--|| "Mahasiswa" : mahasiswa
"DosenPembimbingMagang" |o--|| "User" : user
"DosenPembimbingMagang" }o--|| "TahunAjaran" : tahunAjaran
"PembimbingLapangan" |o--|| "User" : user
"PembimbingLapangan" }o--|| "TahunAjaran" : tahunAjaran
"PembimbingLapangan" }o--|| "Satker" : satker
"PenilaianBimbingan" |o--|| "Mahasiswa" : mahasiswa
"PenilaianLaporanDosen" |o--|| "Mahasiswa" : mahasiswa
"PenilaianKinerja" |o--|| "Mahasiswa" : mahasiswa
"PenilaianLaporanPemlap" |o--|| "Mahasiswa" : mahasiswa
"Mahasiswa" |o--|| "User" : user
"Mahasiswa" }o--|| "DosenPembimbingMagang" : dosenPembimbingMagang
"Mahasiswa" }o--|| "PembimbingLapangan" : pembimbingLapangan
"Mahasiswa" }o--|| "Satker" : satker
"Mahasiswa" }o--|| "TahunAjaran" : tahunAjaran
"AdminProvinsi" |o--|| "User" : user
"AdminProvinsi" |o--|| "Provinsi" : provinsi
"AdminSatker" |o--|| "User" : user
"KabupatenKota" }o--|| "Provinsi" : provinsi
"Satker" }o--|| "AdminProvinsi" : adminProvinsi
"Satker" |o--|| "AdminSatker" : adminSatker
"Satker" }o--|| "Provinsi" : provinsi
"Satker" |o--|| "KabupatenKota" : kabupatenKota
"IzinBimbinganSkripsi" }o--|| "Mahasiswa" : mahasiswa
"KelompokBimbinganMagang" }o--|| "BimbinganMagang" : bimbingan
"KelompokBimbinganMagang" }o--|| "Mahasiswa" : mahasiswa
"KelompokBimbinganMagang" }o--|| "DosenPembimbingMagang" : dosen
"KegiatanHarian" }o--|| "Mahasiswa" : mahasiswa
"KegiatanHarian" }o--|| "TipeKegiatan" : tipeKegiatan
"KegiatanHarian" }o--|| "RekapKegiatanBulanan" : RekapKegiatanBulanan
"TipeKegiatan" }o--|| "Mahasiswa" : mahasiswa
"Presensi" }o--|| "Mahasiswa" : mahasiswa
"RekapKegiatanBulanan" }o--|| "Mahasiswa" : mahasiswa
"IzinPresensi" }o--|| "Mahasiswa" : mahasiswa
```

### `User`

**Properties**
  - `userId`: 
  - `email`: 
  - `password`: 
  - `createdAt`: 
  - `updatedAt`: 

### `Roles`

**Properties**
  - `roleId`: 
  - `roleName`: 

### `Permissions`

**Properties**
  - `permissionId`: 
  - `permissionName`: 

### `UserRoles`

**Properties**
  - `id`: 
  - `userId`: 
  - `roleId`: 

### `PermissionRoles`

**Properties**
  - `id`: 
  - `roleId`: 
  - `permissionId`: 

### `UserPermissions`

**Properties**
  - `id`: 
  - `userId`: 
  - `permissionId`: 

### `TahunAjaran`

**Properties**
  - `tahunAjaranId`: 
  - `tahun`: 

### `SatkerPilihan`

**Properties**
  - `satkerPilihanId`: 
  - `satkerId`: 
  - `mahasiswaId`: 
  - `status`: 

### `DosenPembimbingMagang`

**Properties**
  - `dosenId`: 
  - `nip`: 
  - `userId`: 
  - `tahunAjaranId`: 
  - `nama`: 
  - `prodi`: 

### `PembimbingLapangan`

**Properties**
  - `pemlapId`: 
  - `nip`: 
  - `userId`: 
  - `tahunAjaranId`: 
  - `kodeSatker`: 
  - `nama`: 

### `PenilaianBimbingan`

**Properties**
  - `penilaianId`: 
  - `nim`: 
  - `createdAt`: 
  - `updatedAt`: 

### `PenilaianLaporanDosen`

**Properties**
  - `penilaianId`: 
  - `nim`: 
  - `createdAt`: 
  - `updatedAt`: 

### `PenilaianKinerja`

**Properties**
  - `penilaianId`: 
  - `nim`: 
  - `createdAt`: 
  - `updatedAt`: 

### `PenilaianLaporanPemlap`

**Properties**
  - `penilaianId`: 
  - `nim`: 
  - `createdAt`: 
  - `updatedAt`: 

### `Mahasiswa`

**Properties**
  - `mahasiswaId`: 
  - `nim`: 
  - `userId`: 
  - `nipDosen`: 
  - `nipPemlap`: 
  - `tahunAjaranId`: 
  - `satkerId`: 
  - `nama`: 
  - `alamat`: 
  - `prodi`: 
  - `kelas`: 
  - `nomorRekening`: 

### `AdminProvinsi`

**Properties**
  - `adminProvinsiId`: 
  - `userId`: 
  - `kodeProvinsi`: 

### `AdminSatker`

**Properties**
  - `adminSatkerId`: 
  - `userId`: 

### `Provinsi`

**Properties**
  - `provinsiId`: 
  - `kodePriovinsi`: 
  - `nama`: 

### `KabupatenKota`

**Properties**
  - `kabupatenKotaId`: 
  - `kodeKabupatenKota`: 
  - `kodePriovinsi`: 
  - `nama`: 

### `Satker`

**Properties**
  - `satkerId`: 
  - `internalBPS`: 
  - `adminProvinsiId`: 
  - `adminSatkerId`: 
  - `kodeProvinsi`: 
  - `kodeKabupatenKota`: 
  - `nama`: 
  - `kode`: 
  - `email`: 
  - `alamat`: 
  - `kapasitas`: 

### `IzinBimbinganSkripsi`

**Properties**
  - `izinBimbinganId`: 
  - `nim`: 
  - `tanggal`: 
  - `keterangan`: 
  - `status`: 
  - `createdAt`: 
  - `updatedAt`: 

### `BimbinganMagang`

**Properties**
  - `bimbinganId`: 
  - `tanggal`: 
  - `status`: 
  - `tempat`: 
  - `createdAt`: 
  - `updatedAt`: 
  - `nomorKelompok`: 

### `KelompokBimbinganMagang`

**Properties**
  - `kelompokId`: 
  - `bimbinganId`: 
  - `nim`: 
  - `nipDosen`: 
  - `deskripsi`: 
  - `createdAt`: 
  - `updatedAt`: 

### `KegiatanHarian`

**Properties**
  - `kegiatanId`: 
  - `nim`: 
  - `tanggal`: 
  - `deskripsi`: 
  - `volume`: 
  - `satuan`: 
  - `durasi`: 
  - `pemberiTugas`: 
  - `statusPenyelesaian`: 
  - `createdAt`: 
  - `updatedAt`: 
  - `tipeKegiatanId`: 
  - `rekapKegiatanBulananRekapId`: 

### `TipeKegiatan`

**Properties**
  - `tipeKegiatanId`: 
  - `nim`: 
  - `nama`: 
  - `createdAt`: 
  - `updatedAt`: 

### `Presensi`

**Properties**
  - `presensiId`: 
  - `nim`: 
  - `tanggal`: 
  - `waktu`: 
  - `keterangan`: 
  - `createdAt`: 
  - `updatedAt`: 

### `RekapKegiatanBulanan`

**Properties**
  - `rekapId`: 
  - `nim`: 
  - `periode`: 
  - `uraian`: 
  - `satuan`: 
  - `target`: 
  - `realisasi`: 
  - `persentase`: 
  - `tingkatKualitas`: 
  - `keterangan`: 
  - `createdAt`: 
  - `updatedAt`: 

### `IzinPresensi`

**Properties**
  - `izinId`: 
  - `nim`: 
  - `tanggal`: 
  - `waktu`: 
  - `keterangan`: 
  - `createdAt`: 
  - `updatedAt`: 

### `InvalidToken`

**Properties**
  - `id`: 
  - `token`: 
  - `createdAt`: 
  - `updatedAt`: 