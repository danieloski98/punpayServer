import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { CrudService } from 'src/admin/services/crud/crud.service';

@Injectable()
export class RolecheckGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminService: CrudService,
  ) {}

  checkSubset(parentArray, subsetArray) {
    return subsetArray.every((el) => {
      return parentArray.includes(el);
    });
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest() as Request;
    const admin: AdminEntity = request['user'];
    if (admin) {
      const adminFound = await this.adminService.getAdminById(admin.id);
      if (!this.checkSubset(roles, adminFound.data.role)) {
        throw new UnauthorizedException('You do not have permission');
      } else {
        return true;
      }
    }
    console.log(roles);
    throw new UnauthorizedException('You are not allowed');
  }
}
