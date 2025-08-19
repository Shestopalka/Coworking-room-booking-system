import { IsNotEmpty } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  rooms: number;
  user: number;
  startTime: Date;
  endTime: Date;
}
