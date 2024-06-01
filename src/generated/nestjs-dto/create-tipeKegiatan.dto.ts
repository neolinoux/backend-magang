import { IsNotEmpty, IsString } from "class-validator";






export class CreateTipeKegiatanDto {
  @IsString()
  @IsNotEmpty()
  nama: string;
}
