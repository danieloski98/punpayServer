import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CrudService } from './services/crud/crud.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { Next0fkinService } from './services/next0fkin/next0fkin.service';
import { BalanceService } from './services/balance/balance.service';
import { WalletService } from './services/wallet/wallet.service';
import { CrudService as AdminService } from '../admin/services/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { OtpService } from 'src/global-services/otp/otp.service';
import { EmailService } from 'src/global-services/email/email.service';
import { BankEntity } from 'src/bank/Entities/bank.entity';

@Module({
  imports: [
    UserAuthModule,
    TypeOrmModule.forFeature([AdminEntity, BankEntity]),
  ],
  controllers: [UserController],
  providers: [
    CrudService,
    Next0fkinService,
    BalanceService,
    WalletService,
    AdminService,
    OtpService,
    EmailService,
  ],
})
export class UserModule {}
