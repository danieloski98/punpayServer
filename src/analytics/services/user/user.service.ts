import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getUserAnalytics() {
    const TOTAL_USERS = await this.userRepo.count();
    const VERRIFIED = await this.userRepo.findAndCountBy({ KYCVerified: true });

    const NOT_VERRIFIED = await this.userRepo.findAndCount({
      where: { KYCVerified: false },
    });

    return {
      data: {
        TOTAL_USERS,
        VERRIFIED: VERRIFIED[1],
        NOT_VERRIFIED: NOT_VERRIFIED[1],
      },
    };
  }
}
