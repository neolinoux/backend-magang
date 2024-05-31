import { IsNumber } from "class-validator";

export class CreateKapasitasSatkerTahunAjaranDto {
  @IsNumber()
  satkerId: number;

  @IsNumber()
  kapasitas?: number;
}
