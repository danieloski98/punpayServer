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
import { OTP_TYPE, TYPE_OF_OTP } from 'src/Enums/OTP_Type';
import { OtpService } from 'src/global-services/otp/otp.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generator = require('generate-password');

@Injectable()
export class CrudService {
  private logger = new Logger('ADMIN:CRDUSERVICE');
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    private otpService: OtpService,
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
    console.log(account);
    if (!match) {
      throw new BadRequestException('Invalid email or password!');
    }
    const token = sign({ ...payload, id: account.id }, process.env.JWT_KEY, {
      algorithm: 'HS256',
      expiresIn: '2h',
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
    const password = await generator.generate({
      length: 10,
      numbers: true,
    });
    // const salt = await genSalt();
    // const hashP = await hash(password, salt);
    const obj = {
      email: payload.email,
      password,
      bio: payload.bio,
      fullname: payload.fullname,
      roles: payload.roles,
    };
    console.log(obj);
    const data = await this.adminRepo.create(obj).save();
    // send email
    await this.emailService.generateAdminPassword(payload.email, password);
    delete data.password;
    data['password'] = password;
    return {
      message: 'Admin created',
      data,
    };
  }

  async generateOTP(id: string) {
    const otp = await this.otpService.generateOtp(
      id,
      'ADMIN',
      'PAYMENT_VERIFICATION',
    );
    return otp;
  }

  async verifyOtp(userId: string, code: number) {
    const valid = await this.otpService.verifyOtp(
      userId,
      code,
      'PAYMENT_VERIFICATION',
    );
    if (!valid) {
      throw new BadRequestException('Invalid OTP');
    }

    return {
      message: 'OTP valid',
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
