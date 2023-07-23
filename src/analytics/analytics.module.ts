import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { UserService } from './services/user/user.service';
import { TransactionsService } from './services/transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TransactionEntity])],
  controllers: [AnalyticsController],
  providers: [UserService, TransactionsService],
})
export class AnalyticsModule {}
