/*
  Warnings:

  - Added the required column `tempat` to the `BimbinganMagang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BimbinganMagang" ADD COLUMN     "tempat" TEXT NOT NULL;
