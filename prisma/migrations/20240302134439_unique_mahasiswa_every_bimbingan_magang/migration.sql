/*
  Warnings:

  - You are about to drop the `_BimbinganMagangToMahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nim` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BimbinganMagangToMahasiswa" DROP CONSTRAINT "_BimbinganMagangToMahasiswa_A_fkey";

-- DropForeignKey
ALTER TABLE "_BimbinganMagangToMahasiswa" DROP CONSTRAINT "_BimbinganMagangToMahasiswa_B_fkey";

-- AlterTable
ALTER TABLE "BimbinganMagang" ADD COLUMN     "nim" TEXT NOT NULL,
ALTER COLUMN "keterangan" DROP NOT NULL,
ALTER COLUMN "judul" DROP NOT NULL,
ALTER COLUMN "tempat" DROP NOT NULL;

-- DropTable
DROP TABLE "_BimbinganMagangToMahasiswa";

-- AddForeignKey
ALTER TABLE "BimbinganMagang" ADD CONSTRAINT "BimbinganMagang_nim_fkey" FOREIGN KEY ("nim") REFERENCES "Mahasiswa"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
