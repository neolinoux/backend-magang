/*
  Warnings:

  - The primary key for the `DosenPembimbingMagang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mahasiswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PembimbingLapangan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[satkerId]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tahunAjaranId` to the `DosenPembimbingMagang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahunAjaranId` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Made the column `nama` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alamat` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prodi` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kelas` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tahunAjaranId` to the `PembimbingLapangan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kabupatenKotaId` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode` to the `Satker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdminProvinsi" DROP CONSTRAINT "AdminProvinsi_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdminSatker" DROP CONSTRAINT "AdminSatker_userId_fkey";

-- DropForeignKey
ALTER TABLE "BimbinganDosen" DROP CONSTRAINT "BimbinganDosen_nim_fkey";

-- DropForeignKey
ALTER TABLE "BimbinganDosen" DROP CONSTRAINT "BimbinganDosen_nipDosen_fkey";

-- DropForeignKey
ALTER TABLE "DosenPembimbingMagang" DROP CONSTRAINT "DosenPembimbingMagang_userId_fkey";

-- DropForeignKey
ALTER TABLE "IzinBimbinganSkripsi" DROP CONSTRAINT "IzinBimbinganSkripsi_nim_fkey";

-- DropForeignKey
ALTER TABLE "IzinPresensi" DROP CONSTRAINT "IzinPresensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_nim_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_nipDosen_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_nipPemlap_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_satkerId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "PembimbingLapangan" DROP CONSTRAINT "PembimbingLapangan_userId_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianBimbingan" DROP CONSTRAINT "PenilaianBimbingan_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianKinerja" DROP CONSTRAINT "PenilaianKinerja_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanDosen" DROP CONSTRAINT "PenilaianLaporanDosen_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanPemlap" DROP CONSTRAINT "PenilaianLaporanPemlap_nim_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "RekapKegiatanBulanan" DROP CONSTRAINT "RekapKegiatanBulanan_nim_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_adminProvinsiId_fkey";

-- DropForeignKey
ALTER TABLE "TipeKegiatan" DROP CONSTRAINT "TipeKegiatan_nim_fkey";

-- DropIndex
DROP INDEX "Mahasiswa_nipDosen_key";

-- DropIndex
DROP INDEX "Mahasiswa_nipPemlap_key";

-- AlterTable
ALTER TABLE "BimbinganDosen" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DosenPembimbingMagang" DROP CONSTRAINT "DosenPembimbingMagang_pkey",
ADD COLUMN     "dosenId" SERIAL NOT NULL,
ADD COLUMN     "tahunAjaranId" INTEGER NOT NULL,
ADD CONSTRAINT "DosenPembimbingMagang_pkey" PRIMARY KEY ("dosenId");

-- AlterTable
ALTER TABLE "IzinBimbinganSkripsi" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "IzinPresensi" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "KegiatanHarian" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pkey",
ADD COLUMN     "mahasiswaId" SERIAL NOT NULL,
ADD COLUMN     "tahunAjaranId" INTEGER NOT NULL,
ALTER COLUMN "nipDosen" DROP NOT NULL,
ALTER COLUMN "nipPemlap" DROP NOT NULL,
ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "alamat" SET NOT NULL,
ALTER COLUMN "prodi" SET NOT NULL,
ALTER COLUMN "kelas" SET NOT NULL,
ALTER COLUMN "satkerId" DROP NOT NULL,
ADD CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("mahasiswaId");

-- AlterTable
ALTER TABLE "PembimbingLapangan" DROP CONSTRAINT "PembimbingLapangan_pkey",
ADD COLUMN     "pemlapId" SERIAL NOT NULL,
ADD COLUMN     "tahunAjaranId" INTEGER NOT NULL,
ADD CONSTRAINT "PembimbingLapangan_pkey" PRIMARY KEY ("pemlapId");

-- AlterTable
ALTER TABLE "PenilaianBimbingan" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PenilaianKinerja" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PenilaianLaporanDosen" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PenilaianLaporanPemlap" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Presensi" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Satker" ADD COLUMN     "internalBPS" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "kabupatenKotaId" INTEGER NOT NULL,
ADD COLUMN     "kapasitas" INTEGER,
ADD COLUMN     "kode" TEXT NOT NULL,
ALTER COLUMN "adminProvinsiId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TipeKegiatan" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "TahunAjaran" (
    "tahunAjaranId" SERIAL NOT NULL,
    "tahunAjaran" TEXT NOT NULL,

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
CREATE TABLE "Provinsi" (
    "provinsiId" SERIAL NOT NULL,
    "kodePriovinsi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("provinsiId")
);

-- CreateTable
CREATE TABLE "KabupatenKota" (
    "kabupatenKotaId" SERIAL NOT NULL,
    "kodeKabupatenKota" TEXT,
    "provinsiId" INTEGER,
    "nama" TEXT NOT NULL,

    CONSTRAINT "KabupatenKota_pkey" PRIMARY KEY ("kabupatenKotaId")
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
CREATE UNIQUE INDEX "TahunAjaran_tahunAjaran_key" ON "TahunAjaran"("tahunAjaran");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_provinsiId_key" ON "Provinsi"("provinsiId");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_nama_key" ON "Provinsi"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_kabupatenKotaId_key" ON "KabupatenKota"("kabupatenKotaId");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_nama_key" ON "KabupatenKota"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "InvalidToken_id_key" ON "InvalidToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvalidToken_token_key" ON "InvalidToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_satkerId_key" ON "Satker"("satkerId");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kode_key" ON "Satker"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

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
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KabupatenKota" ADD CONSTRAINT "KabupatenKota_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi"("provinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_adminProvinsiId_fkey" FOREIGN KEY ("adminProvinsiId") REFERENCES "AdminProvinsi"("adminProvinsiId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kabupatenKotaId_fkey" FOREIGN KEY ("kabupatenKotaId") REFERENCES "KabupatenKota"("kabupatenKotaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinBimbinganSkripsi" ADD CONSTRAINT "IzinBimbinganSkripsi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganDosen" ADD CONSTRAINT "BimbinganDosen_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganDosen" ADD CONSTRAINT "BimbinganDosen_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipeKegiatan" ADD CONSTRAINT "TipeKegiatan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulanan" ADD CONSTRAINT "RekapKegiatanBulanan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE CASCADE ON UPDATE CASCADE;
