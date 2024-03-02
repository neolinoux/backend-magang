/*
  Warnings:

  - You are about to drop the column `judul` on the `KegiatanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `kualitas` on the `KegiatanHarian` table. All the data in the column will be lost.
  - You are about to drop the column `kuantitas` on the `KegiatanHarian` table. All the data in the column will be lost.
  - Added the required column `durasi` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pemberiTugas` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satuan` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" DROP COLUMN "judul",
DROP COLUMN "kualitas",
DROP COLUMN "kuantitas",
ADD COLUMN     "durasi" INTEGER NOT NULL,
ADD COLUMN     "pemberiTugas" TEXT NOT NULL,
ADD COLUMN     "satuan" INTEGER NOT NULL,
ADD COLUMN     "volume" INTEGER NOT NULL;
