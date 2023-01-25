import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionsService } from './services/transactions/transactions.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService]
})
export class TransactionModule {}
