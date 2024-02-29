-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "permissionId" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permissionId")
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionRoles" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "PermissionRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TahunAjaran" (
    "tahunAjaranId" SERIAL NOT NULL,
    "tahun" TEXT NOT NULL,

    CONSTRAINT "TahunAjaran_pkey" PRIMARY KEY ("tahunAjaranId")
);

-- CreateTable
CREATE TABLE "SatkerPilihan" (
    "satkerPilihanId" SERIAL NOT NULL,
    "satkerId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,

    CONSTRAINT "SatkerPilihan_pkey" PRIMARY KEY ("satkerPilihanId")
);

-- CreateTable
CREATE TABLE "DosenPembimbingMagang" (
    "dosenId" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,

    CONSTRAINT "DosenPembimbingMagang_pkey" PRIMARY KEY ("dosenId")
);

-- CreateTable
CREATE TABLE "PembimbingLapangan" (
    "pemlapId" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tahunAjaranId" INTEGER NOT NULL,
    "kodeSatker" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "PembimbingLapangan_pkey" PRIMARY KEY ("pemlapId")
);

-- CreateTable
CREATE TABLE "PenilaianBimbingan" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PenilaianBimbingan_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "PenilaianLaporanDosen" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PenilaianLaporanDosen_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "PenilaianKinerja" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PenilaianKinerja_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "PenilaianLaporanPemlap" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PenilaianLaporanPemlap_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "mahasiswaId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nipDosen" TEXT,
    "nipPemlap" TEXT,
    "tahunAjaranId" INTEGER NOT NULL,
    "satkerId" INTEGER,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "nomorRekening" TEXT,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("mahasiswaId")
);

-- CreateTable
CREATE TABLE "AdminProvinsi" (
    "adminProvinsiId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kodeProvinsi" TEXT NOT NULL,

    CONSTRAINT "AdminProvinsi_pkey" PRIMARY KEY ("adminProvinsiId")
);

-- CreateTable
CREATE TABLE "AdminSatker" (
    "adminSatkerId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminSatker_pkey" PRIMARY KEY ("adminSatkerId")
);

-- CreateTable
CREATE TABLE "Provinsi" (
    "provinsiId" SERIAL NOT NULL,
    "kodePriovinsi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("provinsiId")
);

-- CreateTable
CREATE TABLE "KabupatenKota" (
    "kabupatenKotaId" SERIAL NOT NULL,
    "kodeKabupatenKota" TEXT NOT NULL,
    "kodePriovinsi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "KabupatenKota_pkey" PRIMARY KEY ("kabupatenKotaId")
);

-- CreateTable
CREATE TABLE "Satker" (
    "satkerId" SERIAL NOT NULL,
    "internalBPS" BOOLEAN NOT NULL DEFAULT true,
    "adminProvinsiId" INTEGER,
    "adminSatkerId" INTEGER,
    "kodeProvinsi" TEXT NOT NULL,
    "kodeKabupatenKota" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kapasitas" INTEGER,

    CONSTRAINT "Satker_pkey" PRIMARY KEY ("satkerId")
);

-- CreateTable
CREATE TABLE "IzinBimbinganSkripsi" (
    "izinBimbinganId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "IzinBimbinganSkripsi_pkey" PRIMARY KEY ("izinBimbinganId")
);

-- CreateTable
CREATE TABLE "BimbinganDosen" (
    "bimbinganId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nipDosen" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BimbinganDosen_pkey" PRIMARY KEY ("bimbinganId")
);

-- CreateTable
CREATE TABLE "KegiatanHarian" (
    "kegiatanId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kuantitas" INTEGER NOT NULL,
    "kualitas" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "tipeKegiatanId" INTEGER NOT NULL,

    CONSTRAINT "KegiatanHarian_pkey" PRIMARY KEY ("kegiatanId")
);

-- CreateTable
CREATE TABLE "Presensi" (
    "presensiId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("presensiId")
);

-- CreateTable
CREATE TABLE "TipeKegiatan" (
    "tipeKegiatanId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TipeKegiatan_pkey" PRIMARY KEY ("tipeKegiatanId")
);

-- CreateTable
CREATE TABLE "RekapKegiatanBulanan" (
    "rekapId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RekapKegiatanBulanan_pkey" PRIMARY KEY ("rekapId")
);

-- CreateTable
CREATE TABLE "IzinPresensi" (
    "izinId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "IzinPresensi_pkey" PRIMARY KEY ("izinId")
);

-- CreateTable
CREATE TABLE "InvalidToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "InvalidToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleName_key" ON "Roles"("roleName");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_permissionName_key" ON "Permissions"("permissionName");

-- CreateIndex
CREATE UNIQUE INDEX "TahunAjaran_tahun_key" ON "TahunAjaran"("tahun");

-- CreateIndex
CREATE UNIQUE INDEX "DosenPembimbingMagang_nip_key" ON "DosenPembimbingMagang"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "DosenPembimbingMagang_userId_key" ON "DosenPembimbingMagang"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PembimbingLapangan_nip_key" ON "PembimbingLapangan"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "PembimbingLapangan_userId_key" ON "PembimbingLapangan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianBimbingan_nim_key" ON "PenilaianBimbingan"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanDosen_nim_key" ON "PenilaianLaporanDosen"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianKinerja_nim_key" ON "PenilaianKinerja"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanPemlap_nim_key" ON "PenilaianLaporanPemlap"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_userId_key" ON "Mahasiswa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProvinsi_userId_key" ON "AdminProvinsi"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProvinsi_kodeProvinsi_key" ON "AdminProvinsi"("kodeProvinsi");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSatker_userId_key" ON "AdminSatker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_provinsiId_key" ON "Provinsi"("provinsiId");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_kodePriovinsi_key" ON "Provinsi"("kodePriovinsi");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_nama_key" ON "Provinsi"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_kabupatenKotaId_key" ON "KabupatenKota"("kabupatenKotaId");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_kodeKabupatenKota_key" ON "KabupatenKota"("kodeKabupatenKota");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_nama_key" ON "KabupatenKota"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_satkerId_key" ON "Satker"("satkerId");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_adminSatkerId_key" ON "Satker"("adminSatkerId");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kodeKabupatenKota_key" ON "Satker"("kodeKabupatenKota");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kode_key" ON "Satker"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "InvalidToken_id_key" ON "InvalidToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvalidToken_token_key" ON "InvalidToken"("token");

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionRoles" ADD CONSTRAINT "PermissionRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionRoles" ADD CONSTRAINT "PermissionRoles_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatkerPilihan" ADD CONSTRAINT "SatkerPilihan_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatkerPilihan" ADD CONSTRAINT "SatkerPilihan_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DosenPembimbingMagang" ADD CONSTRAINT "DosenPembimbingMagang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DosenPembimbingMagang" ADD CONSTRAINT "DosenPembimbingMagang_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_kodeSatker_fkey" FOREIGN KEY ("kodeSatker") REFERENCES "Satker"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianBimbingan" ADD CONSTRAINT "PenilaianBimbingan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanDosen" ADD CONSTRAINT "PenilaianLaporanDosen_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianKinerja" ADD CONSTRAINT "PenilaianKinerja_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanPemlap" ADD CONSTRAINT "PenilaianLaporanPemlap_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_nipPemlap_fkey" FOREIGN KEY ("nipPemlap") REFERENCES "PembimbingLapangan"("nip") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_tahunAjaranId_fkey" FOREIGN KEY ("tahunAjaranId") REFERENCES "TahunAjaran"("tahunAjaranId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_kodeProvinsi_fkey" FOREIGN KEY ("kodeProvinsi") REFERENCES "Provinsi"("kodePriovinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KabupatenKota" ADD CONSTRAINT "KabupatenKota_kodePriovinsi_fkey" FOREIGN KEY ("kodePriovinsi") REFERENCES "Provinsi"("kodePriovinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminSatkerId_fkey" FOREIGN KEY ("adminSatkerId") REFERENCES "AdminSatker"("adminSatkerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kodeProvinsi_fkey" FOREIGN KEY ("kodeProvinsi") REFERENCES "Provinsi"("kodePriovinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kodeKabupatenKota_fkey" FOREIGN KEY ("kodeKabupatenKota") REFERENCES "KabupatenKota"("kodeKabupatenKota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinBimbinganSkripsi" ADD CONSTRAINT "IzinBimbinganSkripsi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganDosen" ADD CONSTRAINT "BimbinganDosen_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganDosen" ADD CONSTRAINT "BimbinganDosen_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_tipeKegiatanId_fkey" FOREIGN KEY ("tipeKegiatanId") REFERENCES "TipeKegiatan"("tipeKegiatanId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipeKegiatan" ADD CONSTRAINT "TipeKegiatan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulanan" ADD CONSTRAINT "RekapKegiatanBulanan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
