import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { JwtConfigModule } from 'src/users/auth/jwt/jwt.config.module';
import { RegHandler } from './authHandlers/reg-handler';
import { CreateJwtToken } from './authHandlers/create-jwt-token.handler';
import { UsersModule } from 'src/users/users.module';
import { LoginHandler } from './authHandlers/login.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), JwtConfigModule, UsersModule],
  providers: [RegHandler, CreateJwtToken, LoginHandler],
  exports: [RegHandler, CreateJwtToken, LoginHandler],
})
export class HandlerModule {}
