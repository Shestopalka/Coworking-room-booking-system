import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from 'src/db/entities/bookings.entity';
import { UserReservationService } from './userCase/user-reservation.service';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { AdminReservationService } from './adminCase/admin-reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookings]), RoomsModule, UsersModule],
  controllers: [BookingsController],
  providers: [BookingsService, UserReservationService, AdminReservationService],
  exports: [UserReservationService, BookingsService, AdminReservationService],
})
export class BookingsModule {}
