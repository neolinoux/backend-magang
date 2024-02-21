-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

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
CREATE TABLE "Mahasiswa" (
    "nim" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nipDosen" TEXT NOT NULL,
    "nipPemlap" TEXT NOT NULL,
    "nama" TEXT,
    "alamat" TEXT,
    "prodi" TEXT,
    "kelas" TEXT,
    "nomorRekening" TEXT,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("nim")
);

-- CreateTable
CREATE TABLE "DosenPembimbingMagang" (
    "nip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,

    CONSTRAINT "DosenPembimbingMagang_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "PembimbingLapangan" (
    "nip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "PembimbingLapangan_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "AdminProvinsi" (
    "adminProvinsiId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminProvinsi_pkey" PRIMARY KEY ("adminProvinsiId")
);

-- CreateTable
CREATE TABLE "AdminSatker" (
    "adminSatkerId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminSatker_pkey" PRIMARY KEY ("adminSatkerId")
);

-- CreateTable
CREATE TABLE "Satker" (
    "satkerId" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adminProvinsiId" INTEGER NOT NULL,

    CONSTRAINT "Satker_pkey" PRIMARY KEY ("satkerId")
);

-- CreateTable
CREATE TABLE "IzinBimbinganSkripsi" (
    "izinBimbinganId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "IzinBimbinganSkripsi_pkey" PRIMARY KEY ("izinBimbinganId")
);

-- CreateTable
CREATE TABLE "BimbinganDosen" (
    "bimbinganId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nipDosen" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("presensiId")
);

-- CreateTable
CREATE TABLE "TipeKegiatan" (
    "tipeKegiatanId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "TipeKegiatan_pkey" PRIMARY KEY ("tipeKegiatanId")
);

-- CreateTable
CREATE TABLE "RekapKegiatanBulanan" (
    "rekapId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RekapKegiatanBulanan_pkey" PRIMARY KEY ("rekapId")
);

-- CreateTable
CREATE TABLE "PenilaianBimbingan" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianBimbingan_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "penilaianLaporanDosen" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penilaianLaporanDosen_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "penilaianKinerja" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penilaianKinerja_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "penilaianLaporanPemlap" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penilaianLaporanPemlap_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "izinPresensi" (
    "izinId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "izinPresensi_pkey" PRIMARY KEY ("izinId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_userId_key" ON "Mahasiswa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DosenPembimbingMagang_nip_key" ON "DosenPembimbingMagang"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "DosenPembimbingMagang_userId_key" ON "DosenPembimbingMagang"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PembimbingLapangan_nip_key" ON "PembimbingLapangan"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "PembimbingLapangan_userId_key" ON "PembimbingLapangan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminProvinsi_userId_key" ON "AdminProvinsi"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSatker_userId_key" ON "AdminSatker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianBimbingan_nim_key" ON "PenilaianBimbingan"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "penilaianLaporanDosen_nim_key" ON "penilaianLaporanDosen"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "penilaianKinerja_nim_key" ON "penilaianKinerja"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "penilaianLaporanPemlap_nim_key" ON "penilaianLaporanPemlap"("nim");

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
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_nipPemlap_fkey" FOREIGN KEY ("nipPemlap") REFERENCES "PembimbingLapangan"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DosenPembimbingMagang" ADD CONSTRAINT "DosenPembimbingMagang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PembimbingLapangan" ADD CONSTRAINT "PembimbingLapangan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "PenilaianBimbingan" ADD CONSTRAINT "PenilaianBimbingan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaianLaporanDosen" ADD CONSTRAINT "penilaianLaporanDosen_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaianKinerja" ADD CONSTRAINT "penilaianKinerja_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaianLaporanPemlap" ADD CONSTRAINT "penilaianLaporanPemlap_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "izinPresensi" ADD CONSTRAINT "izinPresensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
