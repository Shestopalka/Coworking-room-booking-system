import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/users/auth/jwt/jwt-auth.guard';
import { RoleGuard } from 'src/users/auth/guard/role.guard';
import { RoomDto } from './dto/addRoom.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { PayloadDto } from 'src/users/auth/dto/payload.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UpdateRoomDto } from './dto/updateRooms.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Post('addRoom')
  async addRoom(@Body() dto: RoomDto) {
    return await this.roomsService.addRoom(dto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get('get-room')
  async getRoom(@Body() body) {
    const { roomId } = body;
    return await this.roomsService.getRoom(roomId);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Patch('update-room')
  async updateRoom(@Body() dto: UpdateRoomDto) {
    return await this.roomsService.updateRoom(dto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Delete('delete-room')
  async deleteRoom(@Body() body) {
    const { roomId } = body;
    return await this.roomsService.deleteRoom(roomId);
  }
}
