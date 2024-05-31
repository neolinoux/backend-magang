import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateAdminProvinsiDto {
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsString({
    message: `Kode Provinsi harus berupa string`
  })
  kodeProvinsi: string;
}