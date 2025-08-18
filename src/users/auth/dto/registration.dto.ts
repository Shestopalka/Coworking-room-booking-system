import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
  password: string;
}
