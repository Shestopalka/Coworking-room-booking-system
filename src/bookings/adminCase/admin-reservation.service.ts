import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from 'src/db/entities/bookings.entity';
import { Repository } from 'typeorm';
import { AcceptReservatopnDto } from '../dto/accept-reservation.dto';
import { Between } from 'typeorm';
import { FindReservationDto } from '../dto/get-reservations.dto';
@Injectable()
export class AdminReservationService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingsRepository: Repository<Bookings>,
  ) {}
  async handleReservation(dto: AcceptReservatopnDto) {
    try {
      return await this.bookingsRepository.update(
        { id: dto.reservId },
        { status: dto.status },
      );
    } catch (err) {
      throw err;
    }
  }
  async getReservation(getReservationDto: FindReservationDto) {
    try {
      const { startTime, endTime, status, userId } = getReservationDto;

      const where: any = {};

      if (status) {
        where.status = status;
      }

      if (userId) {
        where.user = { id: userId };
      }

      if (startTime && endTime) {
        where.startTime = Between(new Date(startTime), new Date(endTime));
      }

      const reservations = await this.bookingsRepository.find({
        where,
      });
      return { reservations };
    } catch (err) {
      throw err;
    }
  }
}
