import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { KelompokBimbinganMagang } from "./kelompokBimbinganMagang.entity";

export class CreateBimbinganMagangDto {
  @ApiProperty()
  tanggal: Date;

  status: string;
  
  @ApiProperty()
  tempat?: string;
  
  createdAt?: Date;
  
  @ApiProperty()
  peserta: KelompokBimbinganMagang[];
}
