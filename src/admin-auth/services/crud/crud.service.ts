import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLoginDTO } from 'src/admin-auth/DTO/AdminLoginDTO';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateAccountDTO } from 'src/admin-auth/DTO/CreateAccountDTO';
import { OtpEntity } from 'src/user-auth/Entity/otp.entity';
import { ChangePassword } from 'src/admin-auth/DTO/ChangePasswordDTO';
import { EmailService } from 'src/global-services/email/email.service';
import { OtpService } from 'src/global-services/otp/otp.service';
import { AdminTypeEntity } from 'src/admin-auth/Entities/AdminType.entity';
import { ADMINROLE } from 'src/Enums/AdminRoles';
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
    @InjectRepository(AdminTypeEntity)
    private adminTypeRepo: Repository<AdminTypeEntity>,
    private otpService: OtpService,
    private emailService: EmailService,
  ) {}

  async createAdminRole(name: ADMINROLE) {
    console.log(name);
    const role = await this.adminTypeRepo.findOne({ where: { role: name } });
    if (role) {
      throw new BadRequestException('Role already exists');
    }
    switch (name) {
      case ADMINROLE.SUPERADMIN: {
        const newRole = this.adminTypeRepo.create({
          role: name,
        });
        await this.adminTypeRepo.save(newRole);
        break;
      }
      case ADMINROLE.TRANSACTIONS: {
        const newRole = this.adminTypeRepo.create({
          role: name,
        });
        await this.adminTypeRepo.save(newRole);
        break;
      }
      case ADMINROLE.VERIFICATION: {
        const newRole = this.adminTypeRepo.create({
          role: name,
        });
        await this.adminTypeRepo.save(newRole);
        break;
      }
      default: {
        throw new BadRequestException('Invalid role');
      }
    }

    return {
      message: 'Admin role created',
    };
  }

  async getAllAdminTypes() {
    const adminTypes = await this.adminTypeRepo.find();
    return {
      message: 'All admin types',
      data: adminTypes,
    };
  }

  async verifyPassword(id: string, password: string) {
    const account = await this.adminRepo.findOne({ where: { id } });
    if (account === null) {
      throw new BadRequestException('Admin not found');
    }

    // verify the password
    const match = await compare(password, account.password);
    if (!match) {
      throw new BadRequestException('Invalid password');
    }

    return {
      message: 'Password match',
    };
  }

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
      where: { code: payload.otp },
    });
    const user = await this.adminRepo.findOne({
      where: { id: payload.adminId },
    });
    if (otp === null || otp.expired) {
      throw new BadRequestException('OTP invalid');
    } else {
      await this.otpRepo.delete({ id: otp.id });
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

  async getAdminById(id: string) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (admin === null) throw new BadRequestException('Admin not found');
    return {
      message: 'Admin found',
      data: admin,
    };
  }
}
