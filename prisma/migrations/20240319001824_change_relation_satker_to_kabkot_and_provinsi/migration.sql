-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_kodeKabupatenKota_fkey";

-- DropForeignKey
ALTER TABLE "Satker" DROP CONSTRAINT "Satker_kodeProvinsi_fkey";

-- AlterTable
ALTER TABLE "KegiatanHarian" ALTER COLUMN "satuan" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Satker" ALTER COLUMN "kodeProvinsi" DROP NOT NULL,
ALTER COLUMN "kodeKabupatenKota" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kodeProvinsi_fkey" FOREIGN KEY ("kodeProvinsi") REFERENCES "Provinsi"("kodeProvinsi") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satker" ADD CONSTRAINT "Satker_kodeKabupatenKota_fkey" FOREIGN KEY ("kodeKabupatenKota") REFERENCES "KabupatenKota"("kodeKabupatenKota") ON DELETE SET NULL ON UPDATE CASCADE;
