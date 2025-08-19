import { LoginDto } from 'src/users/auth/dto/login.dto';
import { PayloadDto } from 'src/users/auth/dto/payload.dto';
import { RegDto } from 'src/users/auth/dto/registration.dto';

export type TDto = PayloadDto | LoginDto | RegDto;
