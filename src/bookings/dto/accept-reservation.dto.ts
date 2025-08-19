import { IsNotEmpty } from 'class-validator';

export class AcceptReservatopnDto {
  @IsNotEmpty()
  reservId: number;
  status: string;
}
