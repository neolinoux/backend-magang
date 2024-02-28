import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMahasiswaDto {
  @IsString()
  @ApiProperty()
  nim: string;
  
  @IsString()
  @ApiProperty()
  nama: string;
  
  @IsString()
  @ApiProperty()
  kelas: string;
  
  @IsString()
  @ApiProperty()
  prodi: string;
  
  @IsString()
  @ApiProperty()
  alamat: string;
  
  @IsString()
  @ApiProperty()
  nomorRekening?: string;
}
