import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CrudService } from './services/crud/crud.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { Next0fkinService } from './services/next0fkin/next0fkin.service';
import { BalanceService } from './services/balance/balance.service';

@Module({
  imports: [UserAuthModule],
  controllers: [UserController],
  providers: [CrudService, Next0fkinService, BalanceService],
})
export class UserModule {}
