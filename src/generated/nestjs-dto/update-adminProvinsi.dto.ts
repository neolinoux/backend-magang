import { ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { UpdateUserDto } from "./update-user.dto";

export class UpdateAdminProvinsiDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;
}
