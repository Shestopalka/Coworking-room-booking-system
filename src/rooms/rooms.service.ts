import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from 'src/db/entities/rooms.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/addRoom.dto';
import { UpdateRoomDto } from './dto/updateRooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  async addRoom(dto: RoomDto) {
    try {
      const newRoom = await this.roomsRepository.create({ ...dto });
      return await this.roomsRepository.save(newRoom);
    } catch (err) {
      throw err;
    }
  }
  async getRoom(roomId: number) {
    try {
      const room = await this.roomsRepository.findOne({
        where: {
          id: roomId,
        },
      });
      if (!room) throw new BadRequestException('Room not found');

      return room;
    } catch (err) {
      throw err;
    }
  }
  async updateRoom(dto: UpdateRoomDto) {
    try {
      const existRoom = await this.roomsRepository.findOne({
        where: {
          id: dto.roomId,
        },
      });
      if (!existRoom) throw new BadRequestException('Room not found');

      return await this.roomsRepository.update(
        { id: dto.roomId },
        { ...dto.updateData },
      );
    } catch (err) {
      throw err;
    }
  }
  async deleteRoom(roomId: number) {
    const room = await this.roomsRepository.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) throw new BadRequestException('Room not found');
    await this.roomsRepository.delete({ id: roomId });
  }
}
