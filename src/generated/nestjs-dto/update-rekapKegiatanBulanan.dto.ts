import { IsBoolean, IsOptional, ValidateNested } from "class-validator";
import { UpdateRekapKegiatanBulananTipeKegiatan } from "./update-rekapKegiatanBulananTipeKegiatan.dto";
import { Type } from "class-transformer";

export class UpdateRekapKegiatanBulananDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateRekapKegiatanBulananTipeKegiatan)
  rekapKegiatanBulananTipeKegiatan?: UpdateRekapKegiatanBulananTipeKegiatan[];

  @IsBoolean()
  @IsOptional()
  isFinal?: boolean;
}
