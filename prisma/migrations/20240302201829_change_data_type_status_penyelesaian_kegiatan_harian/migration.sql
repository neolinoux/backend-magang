/*
  Warnings:

  - Changed the type of `statusPenyelesaian` on the `KegiatanHarian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" DROP COLUMN "statusPenyelesaian",
ADD COLUMN     "statusPenyelesaian" INTEGER NOT NULL;
