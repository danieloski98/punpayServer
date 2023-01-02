import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLoginDTO } from 'src/admin-auth/DTO/AdminLoginDTO';
import { AdminEntity } from 'src/admin-auth/Entities/Admin.Entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateAccountDTO } from 'src/admin-auth/DTO/CreateAccountDTO';
import { OtpEntity } from 'src/user-auth/Entity/Otp.Entity';
import { ChangePassword } from 'src/admin-auth/DTO/ChangePasswordDTO';
import { EmailService } from 'src/global-services/email/email.service';
import { OTP_TYPE } from 'src/Enums/OTP_Type';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');

@Injectable()
export class CrudService {
  private logger = new Logger('ADMIN:CRDUSERVICE');
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    private emailService: EmailService,
  ) {}

  async login(payload: AdminLoginDTO) {
    const account = await this.adminRepo.findOne({
      where: { email: payload.email },
      select: ['id', 'email', 'bio', 'password'],
    });
    if (account === null) {
      throw new BadRequestException('Invalid Email or Password');
    }

    const match = await compare(payload.password, account.password);
    if (!match) {
      throw new BadRequestException('Invalid email or password!');
    }
    const token = sign({ ...payload, id: account.id }, process.env.JWT_KEY, {
      algorithm: 'HS256',
    });
    delete account.password;
    return {
      message: 'login successful',
      data: {
        user: account,
        token,
      },
    };
  }

  async createAdmin(payload: CreateAccountDTO) {
    const account = await this.adminRepo.findOne({
      where: { email: payload.email },
    });
    console.log(account);
    if (account !== null) {
      throw new BadRequestException('Email already in use');
    }
    const data = await this.adminRepo.create(payload).save();
    delete data.password;
    return {
      message: 'Admin created',
      data,
    };
  }

  async generateOTP(id: string) {
    const user = await this.adminRepo.findOne({ where: { id } });
    const otpE = await this.otpRepo.findOne({
      where: { userId: id, type: OTP_TYPE.ADMIN },
    });
    if (otpE !== null) {
      const del = await this.otpRepo.delete({
        userId: id,
        type: OTP_TYPE.ADMIN,
      });
      console.log(`Deleted Count ${del.affected}`);
    }
    if (user === null) {
      throw new BadRequestException('Account not found');
    }
    const options = {
      min: 10000,
      max: 19999,
      integer: true,
    };
    const code = randomNumber(options);
    const otp = await this.otpRepo
      .create({ userId: user.id, code, type: OTP_TYPE.ADMIN })
      .save();
    const timeOut = setTimeout(async () => {
      await this.otpRepo.update({ id: otp.id }, { expired: true });
      this.logger.debug('OTP cleared!!!');
      clearTimeout(timeOut);
    }, 1000 * 60);
    const email = await this.emailService.generateAdminCode(user.email, code);
    this.logger.debug(email);
    return {
      message: 'OTP sent',
    };
  }

  async changePassword(payload: ChangePassword) {
    const otp = await this.otpRepo.findOne({
      where: { code: payload.otp, type: OTP_TYPE.ADMIN },
    });
    const user = await this.adminRepo.findOne({
      where: { id: payload.adminId },
    });
    if (otp === null || otp.expired) {
      throw new BadRequestException('OTP invalid');
    } else {
      this.otpRepo.delete({ id: otp.id });
    }

    if (user === null) {
      throw new BadRequestException('Account not found');
    }

    // verify password
    const match = compare(payload.oldPassword, user.password);
    if (!match) {
      throw new BadRequestException('Passwords do not match');
    }

    const salt = await genSalt();
    const hashP = await hash(payload.newPassword, salt);
    await this.adminRepo.update({ id: user.id }, { password: hashP });
    return {
      messgae: 'Password changed',
    };
  }
}
