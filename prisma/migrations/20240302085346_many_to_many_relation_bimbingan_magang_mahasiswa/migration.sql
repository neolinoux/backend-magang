/*
  Warnings:

  - You are about to drop the column `nim` on the `BimbinganMagang` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BimbinganMagang" DROP CONSTRAINT "BimbinganMagang_nim_fkey";

-- AlterTable
ALTER TABLE "BimbinganMagang" DROP COLUMN "nim";

-- CreateTable
CREATE TABLE "_BimbinganMagangToMahasiswa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BimbinganMagangToMahasiswa_AB_unique" ON "_BimbinganMagangToMahasiswa"("A", "B");

-- CreateIndex
CREATE INDEX "_BimbinganMagangToMahasiswa_B_index" ON "_BimbinganMagangToMahasiswa"("B");

-- AddForeignKey
ALTER TABLE "_BimbinganMagangToMahasiswa" ADD CONSTRAINT "_BimbinganMagangToMahasiswa_A_fkey" FOREIGN KEY ("A") REFERENCES "BimbinganMagang"("bimbinganId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BimbinganMagangToMahasiswa" ADD CONSTRAINT "_BimbinganMagangToMahasiswa_B_fkey" FOREIGN KEY ("B") REFERENCES "Mahasiswa"("mahasiswaId") ON DELETE CASCADE ON UPDATE CASCADE;
