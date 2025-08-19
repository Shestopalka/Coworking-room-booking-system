import { IsNotEmpty } from 'class-validator';

export class UpdateRoomDto {
  @IsNotEmpty()
  roomId: number;

  @IsNotEmpty()
  updateData: {
    name?: string;
    cpacity?: string;
    location?: string;
    amenities?: string;
  };
}
