import { IsNotEmpty } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  userId: number;
  userEmail: string;
  role: string;
}
