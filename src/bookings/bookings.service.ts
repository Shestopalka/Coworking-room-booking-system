import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from 'src/db/entities/bookings.entity';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
  ) {}

  async findBookingsInRange(dto: ReservationDto) {
    try {
      const findRestavrationsForUser = await this.bookingsRepository.find({
        where: {
          user: { id: dto.user },
          startTime: Between(dto.startTime, dto.endTime),
        },
      });

      if (findRestavrationsForUser.length > 0)
        throw new BadRequestException(
          'Please select a different time to book.',
        );
      const findRestavrations = await this.bookingsRepository.findOne({
        where: {
          rooms: { id: dto.rooms },
          startTime: Between(dto.startTime, dto.endTime),
        },
      });
      if (findRestavrations)
        throw new BadRequestException('time overlaps with another booking');
    } catch (err) {
      throw err;
    }
  }
}
