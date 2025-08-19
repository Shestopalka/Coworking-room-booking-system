import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { GuardModule } from './users/auth/guard/guard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    BookingsModule,
    RoomsModule,
    DbModule,
    GuardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
