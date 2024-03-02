/*
  Warnings:

  - Added the required column `judul` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BimbinganMagang" ADD COLUMN     "judul" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
