import { IsEmail, IsString, MinLength } from "class-validator";






export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString({
    message: 'Password must be a string'
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters'
  })
  password?: string;
}
