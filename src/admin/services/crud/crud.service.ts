import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { UpdateAdminDto } from 'src/admin/DTO/update.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
  ) {}

  async getAdminById(id: string) {
    const data = await this.adminRepo.findOne({ where: { id } });
    if (data === null) {
      throw new BadRequestException('Admin not found');
    }
    return {
      message: 'Admin',
      data,
    };
  }

  async updateAdminDetails(payload: UpdateAdminDto) {
    const id = payload.id;
    delete payload.id;
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (admin === null) {
      throw new BadRequestException('Admin not found');
    }
    // Update the details
    await this.adminRepo.update({ id }, payload);
    return {
      messgae: 'Details updated',
    };
  }

  async getAllAdmins() {
    const admins = await this.adminRepo.find();
    return {
      data: admins,
    };
  }

  async updatePermissions(id: string, permissionsUpdate: string[]) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (admin === null) {
      throw new BadRequestException('Admin not found');
    }
    // update permissions
    const permissions = [];
    if (permissionsUpdate.length > 3) {
      throw new BadRequestException("Can't have more than 3 roles");
    }
    for (let i = 0; i < admin.roles.length; i++) {
      if (permissionsUpdate.includes(admin.roles[i])) {
        continue;
      } else {
      }
    }
  }
}
