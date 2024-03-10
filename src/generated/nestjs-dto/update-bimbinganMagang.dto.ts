import { ApiProperty } from "@nestjs/swagger";






export class UpdateBimbinganMagangDto {
  @ApiProperty()
  tanggal?: Date;
  @ApiProperty()
  status?: string;
  @ApiProperty()
  tempat?: string;
  createdAt?: Date;
}
