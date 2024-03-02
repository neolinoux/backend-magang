/*
  Warnings:

  - Added the required column `statusPenyelesaian` to the `KegiatanHarian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KegiatanHarian" ADD COLUMN     "statusPenyelesaian" TEXT NOT NULL;
