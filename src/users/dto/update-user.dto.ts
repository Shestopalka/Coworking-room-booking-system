import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  updateData: {
    email?: string;
    role?: string;
    username?: string;
  };
}
