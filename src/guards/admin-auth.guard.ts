import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'jsonwebtoken';
import { AdminEntity } from 'src/admin-auth/Entities/Admin.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  private logger = new Logger('AuthGuard');
  constructor(
    @InjectRepository(AdminEntity) private adminRepo?: Repository<AdminEntity>,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const http = context.switchToHttp().getRequest() as Request;
      const auth = http.headers['authorization'];
      if (auth === undefined || auth === null) {
        throw new UnauthorizedException('Not Authorized');
      }
      const token = auth.split(' ')[1];
      this.logger.warn(token);
      const val = verify(token, process.env.JWT_KEY);
      const admin = await this.adminRepo.findOne({ where: { id: val['id'] } });
      if (admin === undefined) {
        throw new UnauthorizedException('Not authorized');
      }
      this.logger.verbose(val);
      http['user'] = val;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
