-- DropForeignKey
ALTER TABLE "KegiatanHarian" DROP CONSTRAINT "KegiatanHarian_tipeKegiatanId_fkey";

-- AlterTable
ALTER TABLE "KegiatanHarian" ALTER COLUMN "tipeKegiatanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "KegiatanHarian" ADD CONSTRAINT "KegiatanHarian_tipeKegiatanId_fkey" FOREIGN KEY ("tipeKegiatanId") REFERENCES "TipeKegiatan"("tipeKegiatanId") ON DELETE SET NULL ON UPDATE CASCADE;
