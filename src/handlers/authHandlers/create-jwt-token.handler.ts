import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IHandler } from 'src/interfaces/handler.interface';
import { PayloadDto } from 'src/users/auth/dto/payload.dto';

@Injectable()
export class CreateJwtToken implements IHandler<PayloadDto, string> {
  constructor(private readonly jwtService: JwtService) {}

  async handle(dto: PayloadDto): Promise<string> {
    try {
      const access_token = await this.jwtService.sign(dto);
      return access_token;
    } catch (err) {
      throw err;
    }
  }
}
