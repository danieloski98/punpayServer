import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/global-services/email/email.service';
import { CreateAccountDTO } from 'src/user-auth/DTO/CreateAccountDTO';
import { OtpEntity } from 'src/user-auth/Entity/Otp.Entity';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from 'src/user-auth/DTO/LoginDTO';
import { OTP_TYPE } from 'src/Enums/OTP_Type';
import { ERROR_CODES } from 'src/UTILS/ErrorCodes';
import { genSalt, hash } from 'bcrypt';
import { PasswordResetDTO } from 'src/user-auth/DTO/PasswordReset';
import { BalanceEntity } from 'src/user/Entities/Balance.entity';
import { HttpService } from '@nestjs/axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

@Injectable()
export class UserAuthService {
  private logger = new Logger('USERAUTHSERVICE');
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepo: Repository<OtpEntity>,
    @InjectRepository(BalanceEntity)
    private balanceRepo: Repository<BalanceEntity>,
    private emailService: EmailService,
    private httpService: HttpService,
  ) {}

  async createUser(user: CreateAccountDTO) {
    // create quidax sub user
    try {
      const result = await axios.post(
        `https://www.quidax.com/api/v1/users`,
        {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        },
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
            'content-type': 'application/json',
          },
        },
      );
      // find by email
      const account = await this.userRepo.findOne({
        where: { email: user.email },
      });
      if (account !== null) {
        throw new BadRequestException('Email already in use');
      }
      console.log(result.data);
      const newUser = await this.userRepo
        .create({ ...user, quidax_id: result.data.data.id })
        .save();
      // create balance
      await this.balanceRepo.create({ userId: newUser.id }).save();
      // create wallets for user
      // send email
      // generate code
      const options = {
        min: 10000,
        max: 19999,
        integer: true,
      };
      const code = randomNumber(options);
      const otp = await this.otpRepo
        .create({ userId: newUser.id, code, type: OTP_TYPE.EMAIL_VERIFICATION })
        .save();
      const timeOut = setTimeout(async () => {
        await this.otpRepo.update({ id: otp.id }, { expired: true });
        this.logger.debug('OTP cleared!!!');
        clearTimeout(timeOut);
      }, 10000 * 60);
      const email = await this.emailService.sendConfirmationEmail(
        user.email,
        code,
      );
      return {
        message: 'Account created successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.response.data.message);
    }
    // if (request.status !== 200) {
    //   console.log(request.data);
    //   await this.userRepo.delete({ id: newUser.id });
    //   throw new BadRequestException(request.data);
    // } else {
    //   return {
    //     message: 'Account created succesfully',
    //   };
    // }
  }

  async verifyCode(code: number) {
    const otp = await this.otpRepo.findOne({
      where: { code, type: OTP_TYPE.EMAIL_VERIFICATION },
    });
    if (otp === null) {
      throw new BadRequestException('Invalid code');
    }
    if (otp.expired) {
      throw new BadRequestException('Code expired');
    }
    const user = await this.userRepo.findOne({ where: { id: otp.userId } });
    if (user === null) {
      throw new BadRequestException('Invalid code');
    }
    await this.userRepo.update({ id: otp.userId }, { emailVerified: true });
    return {
      message: 'Email Verified',
    };
  }

  async resendVerificationCode(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    const hasCode = await this.otpRepo.find({
      where: { userId: user.id, type: OTP_TYPE.EMAIL_VERIFICATION },
    });
    if (hasCode.length > 0) {
      await this.otpRepo.delete({
        userId: user.id,
        type: OTP_TYPE.EMAIL_VERIFICATION,
      });
    }
    // send email
    // generate code
    const options = {
      min: 10000,
      max: 19999,
      integer: true,
    };
    const code = randomNumber(options);
    const otp = await this.otpRepo
      .create({ userId: user.id, code, type: OTP_TYPE.EMAIL_VERIFICATION })
      .save();
    const timeOut = setTimeout(async () => {
      await this.otpRepo.update({ id: otp.id }, { expired: true });
      this.logger.debug('OTP cleared!!!');
      clearTimeout(timeOut);
    }, 10000 * 60);
    const emailMessage = await this.emailService.sendConfirmationEmail(
      user.email,
      code,
    );
    this.logger.debug(emailMessage.successMessage);
    return {
      message: 'New Code sent!',
    };
  }

  async login(userCred: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { email: userCred.email },
    });
    if (user === null) {
      throw new BadRequestException('Account not found');
    }
    const token = sign({ ...userCred, id: user.id }, process.env.JWT_KEY, {
      expiresIn: '5h',
      algorithm: 'HS256',
    });
    delete user.password;
    return {
      message: 'login successful',
      data: {
        user,
        token,
      },
    };
  }

  async passwordResetRequest(email: string) {
    const account = await this.userRepo.findOne({ where: { email } });
    if (account !== null) {
      // send email
      // generate code
      const options = {
        min: 10000,
        max: 19999,
        integer: true,
      };
      const code = randomNumber(options);
      const otp = await this.otpRepo
        .create({ userId: account.id, code, type: OTP_TYPE.PASSWORD_RESET })
        .save();
      const timeOut = setTimeout(async () => {
        await this.otpRepo.update({ id: otp.id }, { expired: true });
        this.logger.debug('OTP cleared!!!');
        clearTimeout(timeOut);
      }, 10000 * 60);
    }
    return {
      message: 'Code sent to email',
    };
  }

  async verifyResetCode(code: number) {
    const otp = await this.otpRepo.findOne({
      where: { code, type: OTP_TYPE.PASSWORD_RESET },
    });
    if (otp === null) {
      throw new BadRequestException('Invalid code');
    }
    if (otp.expired) {
      throw new BadRequestException('Code expired');
    }
    const user = await this.userRepo.findOne({
      where: { id: otp.userId },
      select: ['email', 'id'],
    });
    if (user === null) {
      throw new BadRequestException('Invalid code');
    }
    await this.userRepo.update({ id: otp.userId }, { emailVerified: true });
    return {
      message: 'OTP Verified',
      data: user,
    };
  }

  async resetPassword(payload: PasswordResetDTO) {
    const user = await this.userRepo.findOne({ where: { id: payload.id } });
    if (user === null) {
      throw new BadRequestException(
        ERROR_CODES.USER_NOT_FOUND,
        'The user with the specified id was not found',
      );
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(payload.password, salt);
    await this.userRepo.update({ id: payload.id }, { password: hashPassword });
    return {
      message: 'Password Reset',
    };
  }
}
