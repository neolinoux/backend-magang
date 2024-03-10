import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";

export class UpdatePembimbingLapanganDto {
  nip?: string;
  @ApiProperty()
  nama?: string;
  @ApiProperty()
  user: User;
}
