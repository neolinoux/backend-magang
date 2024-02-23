/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `izinPresensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penilaianKinerja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penilaianLaporanDosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penilaianLaporanPemlap` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nipDosen]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nipPemlap]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[permissionName]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleName]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "izinPresensi" DROP CONSTRAINT "izinPresensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "penilaianKinerja" DROP CONSTRAINT "penilaianKinerja_nim_fkey";

-- DropForeignKey
ALTER TABLE "penilaianLaporanDosen" DROP CONSTRAINT "penilaianLaporanDosen_nim_fkey";

-- DropForeignKey
ALTER TABLE "penilaianLaporanPemlap" DROP CONSTRAINT "penilaianLaporanPemlap_nim_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "izinPresensi";

-- DropTable
DROP TABLE "penilaianKinerja";

-- DropTable
DROP TABLE "penilaianLaporanDosen";

-- DropTable
DROP TABLE "penilaianLaporanPemlap";

-- CreateTable
CREATE TABLE "PenilaianLaporanDosen" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianLaporanDosen_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "PenilaianKinerja" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianKinerja_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "PenilaianLaporanPemlap" (
    "penilaianId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenilaianLaporanPemlap_pkey" PRIMARY KEY ("penilaianId")
);

-- CreateTable
CREATE TABLE "IzinPresensi" (
    "izinId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IzinPresensi_pkey" PRIMARY KEY ("izinId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanDosen_nim_key" ON "PenilaianLaporanDosen"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianKinerja_nim_key" ON "PenilaianKinerja"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "PenilaianLaporanPemlap_nim_key" ON "PenilaianLaporanPemlap"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nipDosen_key" ON "Mahasiswa"("nipDosen");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nipPemlap_key" ON "Mahasiswa"("nipPemlap");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_permissionName_key" ON "Permissions"("permissionName");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleName_key" ON "Roles"("roleName");

-- AddForeignKey
ALTER TABLE "PenilaianLaporanDosen" ADD CONSTRAINT "PenilaianLaporanDosen_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianKinerja" ADD CONSTRAINT "PenilaianKinerja_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PenilaianLaporanPemlap" ADD CONSTRAINT "PenilaianLaporanPemlap_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
