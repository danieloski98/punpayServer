import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/Rate.entity';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { _ } from 'src/UTILS/lodash';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { BankEntity } from 'src/bank/Entities/Bank.entity';
import { BuyDTO } from 'src/transaction/dto/Buy.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(RateEntity) private rateRepo: Repository<RateEntity>,
  ) {}

  async getTransactionById(id: string) {
    const data = await this.transactionRepo.findOne({ where: { id } });
    if (!data === null) {
      throw new BadRequestException('Transaction not found');
    }
    return {
      message: 'Transaction Found',
      data,
    };
  }

  async getTransactionsForPaticularCoin(userId: string, currency: string) {
    const transactions = await this.transactionRepo.find({
      where: [
        { userId, payoutCurrency: currency },
        { userId, transactionCurrency: currency },
      ],
    });
    const newTransactions = _.uniq(transactions);
    return {
      data: newTransactions,
    };
  }

  /**
   * ADMIN METHODS
   */

  async getUserTransactions(userId: string) {
    const userTransactions = await this.transactionRepo.find({
      where: { userId },
    });
    return {
      data: userTransactions,
    };
  }
}
