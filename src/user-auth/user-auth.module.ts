import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/user.entity';
import { OtpEntity } from './Entity/otp.entity';
import { EmailService } from 'src/global-services/email/email.service';
import { BalanceEntity } from 'src/user/Entities/balance.entity';
import { NextOfKinEntity } from 'src/user/Entities/nextofKin.entity';
import { CoinService } from 'src/coin/services/coin/coin.service';
import { CoinEntity } from 'src/coin/Entities/coin.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OtpEntity,
      BalanceEntity,
      NextOfKinEntity,
      CoinEntity,
    ]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, EmailService, CoinService],
  exports: [TypeOrmModule],
})
export class UserAuthModule {}
