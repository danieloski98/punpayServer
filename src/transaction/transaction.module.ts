import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from './services/transactions/transactions.service';
import { SellService } from './services/sell/sell.service';
import { BuyService } from './services/buy/buy.service';
import { SwapService } from './services/swap/swap.service';
import { SendService } from './services/send/send.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { RateEntity } from 'src/Entities/rate.entity';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      RateEntity,
      BankEntity,
      UserEntity,
      AdminEntity,
    ]),
    HttpModule.register({}),
    // HttpService,
  ],
  controllers: [TransactionController],
  providers: [
    TransactionsService,
    SellService,
    BuyService,
    SwapService,
    SendService,
  ],
})
export class TransactionModule {}
