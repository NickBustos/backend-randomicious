import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
