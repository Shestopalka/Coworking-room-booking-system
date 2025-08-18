import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { HandlerModule } from 'src/handlers/handler.module';
import { UsersModule } from '../users.module';
import { JwtConfigModule } from './jwt/jwt.config.module';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    HandlerModule,
    UsersModule,
    JwtConfigModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
