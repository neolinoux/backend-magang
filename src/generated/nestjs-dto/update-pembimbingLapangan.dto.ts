import { IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { User } from "./user.entity";

export class UpdatePembimbingLapanganDto {
  @IsOptional()
  @IsString()
  nip?: string;

  @IsString()
  @IsOptional()
  nama?: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
