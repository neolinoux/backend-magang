/*
  Warnings:

  - Added the required column `status` to the `SatkerPilihan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SatkerPilihan" ADD COLUMN     "status" TEXT NOT NULL;
