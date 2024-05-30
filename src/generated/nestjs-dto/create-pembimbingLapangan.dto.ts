import { IsOptional, IsString } from "class-validator";
import { Satker } from "./satker.entity";
import { User } from "./user.entity";






export class CreatePembimbingLapanganDto {
  @IsString()
  nip: string;

  @IsString()
  nama: string;
  
  user: User;

  satker: Satker;
}
