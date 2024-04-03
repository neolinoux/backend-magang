/*
  Warnings:

  - You are about to drop the `PenilaianBimbingan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PenilaianKinerja` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PenilaianLaporanDosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PenilaianLaporanPemlap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SatkerPilihan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PenilaianBimbingan" DROP CONSTRAINT "PenilaianBimbingan_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianKinerja" DROP CONSTRAINT "PenilaianKinerja_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanDosen" DROP CONSTRAINT "PenilaianLaporanDosen_nim_fkey";

-- DropForeignKey
ALTER TABLE "PenilaianLaporanPemlap" DROP CONSTRAINT "PenilaianLaporanPemlap_nim_fkey";

-- DropForeignKey
ALTER TABLE "SatkerPilihan" DROP CONSTRAINT "SatkerPilihan_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "SatkerPilihan" DROP CONSTRAINT "SatkerPilihan_satkerId_fkey";

-- AlterTable
ALTER TABLE "Satker" ADD COLUMN     "pilihanSatkerId" INTEGER;

-- DropTable
DROP TABLE "PenilaianBimbingan";

-- DropTable
DROP TABLE "PenilaianKinerja";

-- DropTable
DROP TABLE "PenilaianLaporanDosen";

-- DropTable
DROP TABLE "PenilaianLaporanPemlap";

-- DropTable
DROP TABLE "SatkerPilihan";

-- CreateTable
CREATE TABLE "PilihanSatker" (
    "pilihanSatkerId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PilihanSatker_pkey" PRIMARY KEY ("pilihanSatkerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PilihanSatker_nim_key" ON "PilihanSatker"("nim");

-- AddForeignKey
ALTER TABLE "PilihanSatker" ADD CONSTRAINT "PilihanSatker_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_pilihanSatkerId_fkey" FOREIGN KEY ("pilihanSatkerId") REFERENCES "PilihanSatker"("pilihanSatkerId") ON DELETE SET NULL ON UPDATE CASCADE;
