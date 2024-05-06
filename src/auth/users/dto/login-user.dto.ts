import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
