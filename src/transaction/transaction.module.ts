import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from './services/transactions/transactions.service';
import { SellService } from './services/sell/sell.service';
import { BuyService } from './services/buy/buy.service';
import { SwapService } from './services/swap/swap.service';
import { SendService } from './services/send/send.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { RateEntity } from 'src/Entities/Rate.entity';
import { BankEntity } from 'src/bank/Entities/Bank.entity';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UserEntity } from 'src/user-auth/Entity/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      RateEntity,
      BankEntity,
      UserEntity,
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
    // HttpService,
  ],
})
export class TransactionModule {}
