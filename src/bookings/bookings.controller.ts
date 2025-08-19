import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserReservationService } from './userCase/user-reservation.service';
import { JwtAuthGuard } from 'src/users/auth/jwt/jwt-auth.guard';
import { ReservationDto } from './dto/reservation.dto';
import { ParseDatePipe } from 'src/validation/parceDate.pipe';
import { GetUser } from 'src/decorators/get-user.decorator';
import { PayloadDto } from 'src/users/auth/dto/payload.dto';
import { RoleGuard } from 'src/users/auth/guard/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { AcceptReservatopnDto } from './dto/accept-reservation.dto';
import { AdminReservationService } from './adminCase/admin-reservation.service';
import { FindReservationDto } from './dto/get-reservations.dto';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly userRestavrationService: UserReservationService,
    private readonly adminRestavrationService: AdminReservationService,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Post('accept-reservation')
  async acceptRestavration(
    @GetUser() user: PayloadDto,
    @Body() dto: AcceptReservatopnDto,
  ) {
    return await this.adminRestavrationService.handleReservation(dto);
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('admin')
  @Get('find-reservations')
  async findRestavrations(
    @GetUser() user: PayloadDto,
    @Body() dto: FindReservationDto,
  ) {
    return await this.adminRestavrationService.getReservation(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-reservation')
  async createRestavration(
    @GetUser() user: PayloadDto,
    @Body(ParseDatePipe) dto: ReservationDto,
  ) {
    dto.user = user.userId;
    await this.userRestavrationService.addReservation(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get-reservations')
  async getRestavrations(@GetUser() user: PayloadDto) {
    return this.userRestavrationService.getReservation(user.userId);
  }
}
