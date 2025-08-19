import { IsNotEmpty } from 'class-validator';
import { ReservationDto } from './reservation.dto';

export class FindReservationDto {
  userId?: number;
  status?: string;
  startTime?: string;
  endTime?: string;
}
