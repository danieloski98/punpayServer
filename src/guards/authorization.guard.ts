import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private logger = new Logger('AuthGuard');
  canActivate(context: ExecutionContext): boolean {
    try {
      const http = context.switchToHttp().getRequest() as Request;
      const auth = http.headers['authorization'];
      if (auth === undefined || auth === null) {
        throw new UnauthorizedException('Not Authorized');
      }
      const token = auth.split(' ')[1];
      const val = verify(token, process.env.JWT_KEY);
      this.logger.verbose(val);
      http['user'] = val;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
