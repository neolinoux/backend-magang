import { ApiProperty } from "@nestjs/swagger";
import { Satker } from "./satker.entity";
import { TahunAjaran } from "./tahunAjaran.entity";
import { User } from "./user.entity";

export class CreatePembimbingLapanganDto {
  @ApiProperty()
  nip: string;
  @ApiProperty()
  nama: string;
  @ApiProperty()
  user: User;
  @ApiProperty()
  tahunAjaran: TahunAjaran;
  @ApiProperty()
  satker: Satker;
}
