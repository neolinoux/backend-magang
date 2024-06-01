import { IsNumber, IsOptional } from "class-validator";
import { TahunAjaran } from "./tahunAjaran.entity";

export class CreateKapasitasSatkerTahunAjaranDto {
  satkerId: number;

  @IsNumber()
  @IsOptional()
  kapasitas?: number;

  tahunAjaran: TahunAjaran;
}
