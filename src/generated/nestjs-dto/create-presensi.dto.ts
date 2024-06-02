import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePresensiDto {
  @IsString()
  @IsNotEmpty()
  tanggal: string;

  @IsString()
  @IsNotEmpty()
  waktuDatang: string;

  waktuPulang: string;
  
  status: string;
}
