import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Tyt помилка?');

    const request = context.switchToHttp().getRequest();
    console.log(request);

    return request.user.role === 'admin';
  }
}
