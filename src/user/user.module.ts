import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CrudService } from './services/crud/crud.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { Next0fkinService } from './services/next0fkin/next0fkin.service';
import { BalanceService } from './services/balance/balance.service';
import { WalletService } from './services/wallet/wallet.service';
import { CrudService as AdminService } from '../admin/services/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/Admin.entity';

@Module({
  imports: [UserAuthModule, TypeOrmModule.forFeature([AdminEntity])],
  controllers: [UserController],
  providers: [
    CrudService,
    Next0fkinService,
    BalanceService,
    WalletService,
    AdminService,
  ],
})
export class UserModule {}
