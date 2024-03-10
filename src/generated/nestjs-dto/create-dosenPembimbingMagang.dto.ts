import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";






export class CreateDosenPembimbingMagangDto {
  @ApiProperty()
  nip: string;
  @ApiProperty()
  nama: string;
  @ApiProperty()
  prodi: string;
  @ApiProperty()
  user: User;
}
