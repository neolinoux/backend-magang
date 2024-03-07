/*
  Warnings:

  - Added the required column `periode` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persentase` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realisasi` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satuan` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uraian` to the `RekapKegiatanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" ADD COLUMN     "rekapKegiatanBulananRekapId" INTEGER;

-- AlterTable
ALTER TABLE "RekapKegiatanBulanan" ADD COLUMN     "keterangan" TEXT,
ADD COLUMN     "periode" TEXT NOT NULL,
ADD COLUMN     "persentase" INTEGER NOT NULL,
ADD COLUMN     "realisasi" INTEGER NOT NULL,
ADD COLUMN     "satuan" TEXT NOT NULL,
ADD COLUMN     "target" INTEGER NOT NULL,
ADD COLUMN     "tingkatKualitas" INTEGER,
ADD COLUMN     "uraian" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_rekapKegiatanBulananRekapId_fkey" FOREIGN KEY ("rekapKegiatanBulananRekapId") REFERENCES "RekapKegiatanBulanan"("rekapId") ON DELETE SET NULL ON UPDATE CASCADE;
