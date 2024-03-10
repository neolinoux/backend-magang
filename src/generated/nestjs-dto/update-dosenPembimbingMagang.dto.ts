import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";






export class UpdateDosenPembimbingMagangDto {
  nip?: string;
nama?: string;
  prodi?: string;

  @ApiProperty()
  user: User;
}
