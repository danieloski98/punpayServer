import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { ChangePasswordDTO } from 'src/user/DTO/ChangePasswordDTO';
import { ERROR_CODES } from 'src/UTILS/ErrorCodes';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    const data = await this.userRepo.find();
    return {
      message: 'Users',
      data,
    };
  }

  async getUserByID(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      // select: ['firstName', 'lastName', 'email', 'createdAt'],
      relations: ['bank'],
    });
    if (user === null) {
      throw new BadRequestException(
        'User not found',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }
    return {
      messgae: 'user details',
      data: user,
    };
  }

  async changePassword(payload: ChangePasswordDTO) {
    // get user
    const user = await this.userRepo.findOne({ where: { id: payload.id } });
    if (user === null) {
      throw new BadRequestException(ERROR_CODES.USER_NOT_FOUND);
    }
    // check old password
    const oldMatch = await compare(payload.oldPassword, user.password);
    const newIsOld = await compare(payload.newPassword, user.password);
    if (!oldMatch) {
      throw new BadRequestException(
        'Old Password does not match',
        `Error Code ${ERROR_CODES.PASSWORD_DO_NOT_MATCH}`,
      );
    }
    if (newIsOld) {
      throw new BadRequestException('Cannot use the same password again');
    }
    const salt = await genSalt(10);
    const pHash = await hash(payload.newPassword, salt);
    await this.userRepo.update({ id: user.id }, { password: pHash });
    return {
      message: 'Password changed',
    };
  }
}
