import { BadRequestException, Injectable } from '@nestjs/common';
import { IHandler } from 'src/interfaces/handler.interface';
import { LoginDto } from 'src/users/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginHandler implements IHandler<LoginDto, number> {
  constructor(private readonly userService: UsersService) {}

  async handle(dto: LoginDto): Promise<number> {
    try {
      const user = await this.userService.getUser(dto.email);
      const isValidPass = await bcrypt.compare(dto.password, user.password);
      if (!isValidPass)
        throw new BadRequestException('This password not valid!');

      return user.id;
    } catch (err) {
      throw err;
    }
  }
}
