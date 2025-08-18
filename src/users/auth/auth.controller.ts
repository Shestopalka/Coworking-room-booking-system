import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { AdminDto } from './dto/addAdmin-role.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { PayloadDto } from './dto/payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() dto: LoginDto) {
    return await this.authService.loginUser(dto);
  }

  @Post('registration')
  async registrationUser(@Body() dto: RegDto) {
    return await this.authService.registrationUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('addAdminRole')
  async addAdminRole(@GetUser() user: PayloadDto, @Body() dto: AdminDto) {
    console.log('This user from Controller: ', user);

    dto.userId = user.userId;
    return this.authService.addAdminRole(dto);
  }
}
