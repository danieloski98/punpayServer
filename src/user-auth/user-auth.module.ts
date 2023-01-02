import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/User.entity';
import { OtpEntity } from './Entity/Otp.Entity';
import { EmailService } from 'src/global-services/email/email.service';
import { BalanceEntity } from 'src/user/Entities/Balance.entity';
import { NextOfKinEntity } from 'src/user/Entities/NextofKin.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OtpEntity,
      BalanceEntity,
      NextOfKinEntity,
    ]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, EmailService],
  exports: [TypeOrmModule],
})
export class UserAuthModule {}
