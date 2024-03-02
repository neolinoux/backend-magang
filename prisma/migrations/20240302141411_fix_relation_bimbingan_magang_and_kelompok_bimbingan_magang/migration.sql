/*
  Warnings:

  - You are about to drop the column `nomorKelompok` on the `KelompokBimbinganMagang` table. All the data in the column will be lost.
  - Added the required column `bimbinganId` to the `KelompokBimbinganMagang` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BimbinganMagang_nomorKelompok_key";

-- AlterTable
CREATE SEQUENCE bimbinganmagang_nomorkelompok_seq;
ALTER TABLE "BimbinganMagang" ALTER COLUMN "nomorKelompok" SET DEFAULT nextval('bimbinganmagang_nomorkelompok_seq');
ALTER SEQUENCE bimbinganmagang_nomorkelompok_seq OWNED BY "BimbinganMagang"."nomorKelompok";

-- AlterTable
ALTER TABLE "KelompokBimbinganMagang" DROP COLUMN "nomorKelompok",
ADD COLUMN     "bimbinganId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "KelompokBimbinganMagang" ADD CONSTRAINT "KelompokBimbinganMagang_bimbinganId_fkey" FOREIGN KEY ("bimbinganId") REFERENCES "BimbinganMagang"("bimbinganId") ON DELETE RESTRICT ON UPDATE CASCADE;
