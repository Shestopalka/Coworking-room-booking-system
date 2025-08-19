import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/db/entities/rooms.entity';
import { GuardModule } from 'src/users/auth/guard/guard.module';
import { JwtConfigModule } from 'src/users/auth/jwt/jwt.config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms]), GuardModule, JwtConfigModule],
  providers: [RoomsService],
  exports: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
