import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegDto } from './dto/registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entities/users.entity';
import { Repository } from 'typeorm';
import { RegHandler } from 'src/handlers/authHandlers/reg-handler';
import { CreateJwtToken } from 'src/handlers/authHandlers/create-jwt-token.handler';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users.service';
import { LoginHandler } from 'src/handlers/authHandlers/login.handler';
import { AdminDto } from './dto/addAdmin-role.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly regHandler: RegHandler,
    private readonly loginHandler: LoginHandler,
    private readonly createJwtToken: CreateJwtToken,
    private readonly userService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async registrationUser(dto: RegDto) {
    try {
      await this.regHandler.handle(dto);
      const user = await this.userService.createUser(dto);
      const payloadData = {
        userId: user.id,
        userEmail: user.email,
        role: user.role,
      };
      const access_token = await this.createJwtToken.handle(payloadData);
      return { access_token };
    } catch (err) {
      throw err;
    }
  }

  async loginUser(dto: LoginDto) {
    try {
      const userId = await this.loginHandler.handle(dto);
      const user = await this.userService.getUserById(userId);

      const access_token = await this.createJwtToken.handle({
        userId: userId,
        userEmail: dto.email,
        role: user.role,
      });
      return { access_token };
    } catch (err) {
      throw err;
    }
  }
  async addAdminRole(dto: AdminDto) {
    try {
      if (dto.secret_key !== this.config.get<string>('SECRET_KEY'))
        throw new UnauthorizedException('You cannot do this.');
      const user = await this.userService.getUserById(dto.userId);
      dto.userId = user.id;
      await this.userService.updateUser({
        user: dto.userId,
        updateData: { role: 'admin' },
      });
    } catch (err) {
      throw err;
    }
  }
}
