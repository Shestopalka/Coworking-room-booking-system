import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { IHandler } from 'src/interfaces/handler.interface';
import { RegDto } from 'src/users/auth/dto/registration.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegHandler implements IHandler<RegDto, void> {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async handle(dto: RegDto): Promise<void> {
    try {
      const existUser = await this.usersRepository.findOne({
        where: {
          email: dto.email,
        },
      });
      if (existUser) {
        throw new BadRequestException('This email already use');
      }
    } catch (err) {
      throw err;
    }
  }
}
