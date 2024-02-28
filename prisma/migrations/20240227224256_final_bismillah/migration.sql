/*
  Warnings:

  - You are about to drop the column `provinsiId` on the `KabupatenKota` table. All the data in the column will be lost.
  - You are about to drop the column `kabupatenKotaId` on the `Satker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provinsiId]` on the table `AdminProvinsi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeKabupatenKota]` on the table `KabupatenKota` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodePriovinsi]` on the table `Provinsi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminSatkerId]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeKabupatenKota]` on the table `Satker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provinsiId` to the `AdminProvinsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodePriovinsi` to the `KabupatenKota` table without a default value. This is not possible if the table is not empty.
  - Made the column `kodeKabupatenKota` on table `KabupatenKota` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `kodeKabupatenKota` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeProvinsi` to the `Satker` table without a default value. This is not possible if the table is not empty.
  - Made the column `adminProvinsiId` on table `Satker` required. This step will fail if there are existing NULL values in that column.

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
ALTER TABLE "IzinBimbinganSkripsi" DROP CONSTRAINT "IzinBimbinganSkripsi_nim_fkey";

-- DropForeignKey
ALTER TABLE "IzinPresensi" DROP CONSTRAINT "IzinPresensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "KabupatenKota" DROP CONSTRAINT "KabupatenKota_provinsiId_fkey";

-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_nim_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_nim_fkey";

-- DropForeignKey
ALTER TABLE "RekapKegiatanBulanan" DROP CONSTRAINT "RekapKegiatanBulanan_nim_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_kabupatenKotaId_fkey";

-- DropForeignKey
ALTER TABLE "TipeKegiatan" DROP CONSTRAINT "TipeKegiatan_nim_fkey";

-- AlterTable
ALTER TABLE "AdminProvinsi" ADD COLUMN     "provinsiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "KabupatenKota" DROP COLUMN "provinsiId",
ADD COLUMN     "kodePriovinsi" TEXT NOT NULL,
ALTER COLUMN "kodeKabupatenKota" SET NOT NULL;

-- AlterTable
ALTER TABLE "Satker" DROP COLUMN "kabupatenKotaId",
ADD COLUMN     "adminSatkerId" INTEGER,
ADD COLUMN     "kodeKabupatenKota" TEXT NOT NULL,
ADD COLUMN     "kodeProvinsi" TEXT NOT NULL,
ALTER COLUMN "adminProvinsiId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminProvinsi_provinsiId_key" ON "AdminProvinsi"("provinsiId");

-- CreateIndex
CREATE UNIQUE INDEX "KabupatenKota_kodeKabupatenKota_key" ON "KabupatenKota"("kodeKabupatenKota");

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_kodePriovinsi_key" ON "Provinsi"("kodePriovinsi");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_adminSatkerId_key" ON "Satker"("adminSatkerId");

-- CreateIndex
CREATE UNIQUE INDEX "Satker_kodeKabupatenKota_key" ON "Satker"("kodeKabupatenKota");

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProvinsi" ADD CONSTRAINT "AdminProvinsi_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi"("provinsiId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSatker" ADD CONSTRAINT "AdminSatker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KabupatenKota" ADD CONSTRAINT "KabupatenKota_kodePriovinsi_fkey" FOREIGN KEY ("kodePriovinsi") REFERENCES "Provinsi"("kodePriovinsi") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipeKegiatan" ADD CONSTRAINT "TipeKegiatan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapKegiatanBulanan" ADD CONSTRAINT "RekapKegiatanBulanan_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinPresensi" ADD CONSTRAINT "IzinPresensi_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
