import { BadRequestException, Injectable } from '@nestjs/common';
import { ReservationDto } from '../dto/reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from 'src/db/entities/bookings.entity';
import { Repository } from 'typeorm';
import { BookingsService } from '../bookings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserReservationService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
    private readonly bookingsService: BookingsService,
    private readonly roomsService: RoomsService,
    private readonly userService: UsersService,
  ) {}

  async addReservation(dto: ReservationDto) {
    try {
      await this.bookingsService.findBookingsInRange(dto);
      const rooms = await this.roomsService.getRoom(dto.rooms);
      const user = await this.userService.getUserById(dto.user);
      const restavration = await this.bookingsRepository.create({
        user: user,
        rooms: rooms,
        startTime: dto.startTime,
        endTime: dto.endTime,
      });
      return await this.bookingsRepository.save(restavration);
    } catch (err) {
      throw err;
    }
  }
  async getReservation(userId: number) {
    try {
      const existReservations = await this.bookingsRepository.find({
        where: {
          user: { id: userId },
        },
      });
      if (!existReservations)
        throw new BadRequestException('Reservations not found');
      return { existReservations };
    } catch (err) {
      throw err;
    }
  }
}
