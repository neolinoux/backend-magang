/*
  Warnings:

  - You are about to drop the column `nim` on the `BimbinganMagang` table. All the data in the column will be lost.
  - You are about to drop the column `nipDosen` on the `BimbinganMagang` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomorKelompok]` on the table `BimbinganMagang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomorKelompok` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BimbinganMagang" DROP CONSTRAINT "BimbinganMagang_nim_fkey";

-- DropForeignKey
ALTER TABLE "BimbinganMagang" DROP CONSTRAINT "BimbinganMagang_nipDosen_fkey";

-- AlterTable
ALTER TABLE "BimbinganMagang" DROP COLUMN "nim",
DROP COLUMN "nipDosen",
ADD COLUMN     "nomorKelompok" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "KelompokBimbinganMagang" (
    "kelompokId" SERIAL NOT NULL,
    "nomorKelompok" INTEGER NOT NULL,
    "nim" TEXT NOT NULL,
    "nipDosen" TEXT NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "KelompokBimbinganMagang_pkey" PRIMARY KEY ("kelompokId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BimbinganMagang_nomorKelompok_key" ON "BimbinganMagang"("nomorKelompok");

-- AddForeignKey
ALTER TABLE "KelompokBimbinganMagang" ADD CONSTRAINT "KelompokBimbinganMagang_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelompokBimbinganMagang" ADD CONSTRAINT "KelompokBimbinganMagang_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
