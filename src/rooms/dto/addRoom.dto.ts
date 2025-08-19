import { IsNotEmpty } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  name: string;
  cpacity: string;
  location: string;
  amenities: string;
}
