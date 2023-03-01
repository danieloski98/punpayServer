import {
  BadRequestException,
  HttpCode,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/global-services/email/email.service';
import { CreateAccountDTO } from 'src/user-auth/DTO/CreateAccountDTO';
import { OtpEntity } from 'src/user-auth/Entity/otp.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from 'src/user-auth/DTO/LoginDTO';
import { OTP_TYPE } from 'src/Enums/OTP_Type';
import { ERROR_CODES } from 'src/UTILS/ErrorCodes';
import { compare, genSalt, hash } from 'bcrypt';
import { PasswordResetDTO } from 'src/user-auth/DTO/PasswordReset';
import { BalanceEntity } from 'src/user/Entities/balance.entity';
import { HttpService } from '@nestjs/axios';
import { CoinService } from 'src/coin/services/coin/coin.service';
import fluidcoins from 'src/UTILS/fluidcoin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {} from '@nestjs/axios';
import { quidax } from 'src/UTILS/quidax';

type Customer = {
  customer: {
    created_at: string;
    domain: string;
    email: string;
    full_name: string;
    id: string;
    is_blacklisted: boolean;
    merchant_id: string;
    phone_number: string;
    reference: string;
    updated_at: string;
  };
};

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
    private coinService: CoinService,
  ) {}

  async createUser(user: CreateAccountDTO) {
    try {
      // create quidax sub user
      const account = await this.userRepo.findOne({
        where: { email: user.email },
      });
      if (account !== null) {
        throw new BadRequestException('Email already in use');
      }
      // const data = await quidax.users.create({
      //   email: user.email,
      //   first_name: user.firstName,
      //   last_name: user.lastName,
      // });

      // console.log(data);

      if (account !== null) {
        // use the quidax id to create a new user
        const obj = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          quidaxId: 'bc5m64wl',
          // quidaxId: data.data.id,
          password: user.password,
        };
        const newUser = await this.userRepo.create(obj).save();
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
          .create({
            userId: newUser.id,
            code,
            type: OTP_TYPE.EMAIL_VERIFICATION,
          })
          .save();
        const timeOut = setTimeout(async () => {
          await this.otpRepo.update({ id: otp.id }, { expired: true });
          this.logger.debug('OTP cleared!!!');
          clearTimeout(timeOut);
        }, 10000 * 60);
        await this.coinService.createCoinsForUser(newUser.id);
        const email = await this.emailService.sendConfirmationEmail(
          user.email,
          code,
        );
        const token = sign(
          { email: user.email, password: user.password, id: newUser.id },
          process.env.JWT_KEY,
          {
            expiresIn: '5h',
            algorithm: 'HS256',
          },
        );
        delete newUser.password;
        return {
          message: 'Account created successfully',
          data: {
            token,
            user: newUser,
          },
        };
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
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
      throw new BadRequestException('Incorrect Email or Password');
    }
    // compare password
    const match = await compare(userCred.password, user.password);
    if (!match) {
      throw new BadRequestException('Incorrect Email or Password');
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
    if (account === null || account == undefined) {
      throw new BadRequestException('Account not found');
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
      .create({ userId: account.id, code, type: OTP_TYPE.PASSWORD_RESET })
      .save();
    await this.emailService.sendPasswordResetCode(account.email, code);
    const timeOut = setTimeout(async () => {
      await this.otpRepo.update({ id: otp.id }, { expired: true });
      this.logger.debug('OTP cleared!!!');
      clearTimeout(timeOut);
    }, 10000 * 60);
    return {
      message: 'Code sent to email',
      data: {
        id: account.id ? account.id : '',
      },
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
    const code = await this.otpRepo.findOne({ where: { code: +payload.code } });
    if (code === null || code === undefined) {
      throw new BadRequestException('Invalid coode');
    }
    const user = await this.userRepo.findOne({ where: { id: code.userId } });
    if (user === null) {
      throw new BadRequestException(
        ERROR_CODES.USER_NOT_FOUND,
        'The user with the specified id was not found',
      );
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(payload.password, salt);
    await this.userRepo.update({ id: code.userId }, { password: hashPassword });
    return {
      message: 'Password Reset',
    };
  }

  //verify token
  async verifyToken(user: UserEntity) {
    const usr = await this.userRepo.findOne({ where: { id: user.id } });
    if (usr === null || usr === undefined) {
      throw new BadRequestException('User not found');
    }
    delete usr.password;
    return {
      message: usr,
      data: usr,
    };
  }
}
