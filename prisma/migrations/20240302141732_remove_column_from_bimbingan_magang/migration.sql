/*
  Warnings:

  - You are about to drop the column `judul` on the `BimbinganMagang` table. All the data in the column will be lost.
  - You are about to drop the column `keterangan` on the `BimbinganMagang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BimbinganMagang" DROP COLUMN "judul",
DROP COLUMN "keterangan";
