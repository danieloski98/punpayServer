import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP_TYPE, TYPE_OF_OTP, getOtpType } from 'src/Enums/OTP_Type';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { OtpEntity } from 'src/user-auth/Entity/otp.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');

type Requester = 'USER' | 'ADMIN';

@Injectable()
export class OtpService {
  private logger = new Logger('OtpService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpRepo: Repository<OtpEntity>,
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
    private emailService: EmailService,
  ) {}

  async generateOtp(id: string, requester: Requester, otpType: TYPE_OF_OTP) {
    /** OTP SECTION FOR USERS */
    if (requester === 'USER') {
      const user = await this.userRepo.findOne({ where: { id } });
      if (user === null) {
        throw new BadRequestException('User Account not found');
      }
      const otp = await this.otpRepo.findOne({
        where: { userId: id, type: getOtpType(otpType) },
      });
      if (otp !== null) {
        await this.otpRepo.delete({ userId: id, type: OTP_TYPE.USER });
      }
      const options = {
        min: 10000,
        max: 19999,
        integer: true,
      };
      const code = randomNumber(options);
      const newotp = await this.otpRepo
        .create({ userId: user.id, code, type: getOtpType(otpType) })
        .save();
      const timeOut = setTimeout(async () => {
        await this.otpRepo.update({ id: newotp.id }, { expired: true });
        this.logger.debug('OTP cleared!!!');
        clearTimeout(timeOut);
      }, 1000 * 60);
      const email = await this.emailService.generateAdminCode(user.email, code);
      this.logger.debug(email);
      return {
        message: 'OTP sent',
      };
    }

    /** OTP SECTION FOR ADMIN */
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (admin === null) {
      throw new BadRequestException('User Account not found');
    }
    const otp = await this.otpRepo.findOne({
      where: { userId: id, type: getOtpType(otpType) },
    });
    if (otp !== null) {
      await this.otpRepo.delete({ userId: id, type: getOtpType(otpType) });
    }
    const options = {
      min: 10000,
      max: 19999,
      integer: true,
    };
    const code = randomNumber(options);
    await this.otpRepo
      .create({ userId: admin.id, code, type: getOtpType(otpType) })
      .save();
    const timeOut = setTimeout(async () => {
      await this.otpRepo.update({ id: otp.id }, { expired: true });
      this.logger.debug('OTP cleared!!!');
      clearTimeout(timeOut);
    }, 1000 * 60);
    const email = await this.emailService.generateAdminCode(admin.email, code);
    this.logger.debug(email);

    return {
      message: 'OTP sent!',
    };
  }

  async verifyUserOtp(id: string, code: number, type: TYPE_OF_OTP) {
    const otp = await this.otpRepo.findOne({
      where: { userId: id, code, type: getOtpType(type) },
    });
    if (otp === null || otp.expired) {
      throw new BadRequestException('Invalid OTP');
    }
    // Deleting the oTP
    await this.otpRepo.update({ id: otp.id }, { expired: true });
    return {
      message: 'OTP valid',
    };
  }

  async verifyOtp(
    id: string,
    code: number,
    type: TYPE_OF_OTP,
  ): Promise<boolean> {
    const otp = await this.otpRepo.findOne({
      where: { userId: id, code, type: getOtpType(type) },
    });
    if (otp === null || otp.expired) {
      return false;
      //   throw new BadRequestException('Invalid OTP');
    }
    // Deleting the oTP
    await this.otpRepo.delete({ userId: id, code, type: getOtpType(type) });

    return true;
  }
}
