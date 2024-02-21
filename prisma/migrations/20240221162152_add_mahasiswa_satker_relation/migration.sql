/*
  Warnings:

  - Added the required column `satkerId` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "satkerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_satkerId_fkey" FOREIGN KEY ("satkerId") REFERENCES "Satker"("satkerId") ON DELETE RESTRICT ON UPDATE CASCADE;
