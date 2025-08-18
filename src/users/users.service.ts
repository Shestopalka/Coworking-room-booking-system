import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { RegDto } from './auth/dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUser(email: string) {
    try {
      const existUser = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });
      if (!existUser) throw new BadRequestException('User not found');
      return existUser;
    } catch (err) {
      throw err;
    }
  }
  async getUserById(id: number) {
    try {
      const existUser = await this.usersRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!existUser) throw new BadRequestException('User not found');
      return existUser;
    } catch (err) {
      throw err;
    }
  }
  async createUser(dto: RegDto) {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 10);
      dto.password = hashedPass;
      const user = await this.usersRepository.create({ ...dto });
      return await this.usersRepository.save(user);
    } catch (err) {
      throw err;
    }
  }

  async updateUser(dto: UpdateUserDto) {
    try {
      return await this.usersRepository.update(
        { id: dto.user },
        { ...dto.updateData },
      );
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(id: number) {
    await this.usersRepository.delete({ id });
  }
}
