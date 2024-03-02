/*
  Warnings:

  - You are about to drop the `BimbinganDosen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BimbinganDosen" DROP CONSTRAINT "BimbinganDosen_nim_fkey";

-- DropForeignKey
ALTER TABLE "BimbinganDosen" DROP CONSTRAINT "BimbinganDosen_nipDosen_fkey";

-- AlterTable
ALTER TABLE "SatkerPilihan" ALTER COLUMN "status" SET DEFAULT 'Menunggu';

-- DropTable
DROP TABLE "BimbinganDosen";

-- CreateTable
CREATE TABLE "BimbinganMagang" (
    "bimbinganId" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "nipDosen" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BimbinganMagang_pkey" PRIMARY KEY ("bimbinganId")
);

-- AddForeignKey
ALTER TABLE "BimbinganMagang" ADD CONSTRAINT "BimbinganMagang_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BimbinganMagang" ADD CONSTRAINT "BimbinganMagang_nipDosen_fkey" FOREIGN KEY ("nipDosen") REFERENCES "DosenPembimbingMagang"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
