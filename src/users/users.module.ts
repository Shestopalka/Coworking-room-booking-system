import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
