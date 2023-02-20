import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/Admin.Entity';
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
}
