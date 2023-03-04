import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/rate.entity';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { _ } from 'src/UTILS/lodash';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { BuyDTO } from 'src/transaction/dto/Buy.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user-auth/Entity/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(RateEntity) private rateRepo: Repository<RateEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getTransactionById(id: string) {
    const data = await this.transactionRepo.findOne({ where: { id } });
    if (!data === null) {
      throw new BadRequestException('Transaction not found');
    }
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (user === null) {
      throw new BadRequestException('user not found');
    }
    // check the try of transaction
    if (data.transactionType === 1) {
      // get the deposit from quidax
      try {
        // Validate wallet address
        const deposit = await this.httpService.axiosRef.get(
          `https://www.quidax.com/api/v1/users/${user.quidaxId}/deposits/${data.quidaxTransactionId}`,
          {
            headers: {
              authorization: `Bearer ${this.configService.get<string>(
                'QDX_SECRET',
              )}`,
            },
          },
        );
        console.log(deposit.data);
        data['deposit'] = deposit.data.data;
        return {
          data,
        };
      } catch (error) {
        console.log(error.message);
        throw new InternalServerErrorException(error.message);
      }
    }
    if (data.transactionType === 1 || data.transactionType === 4) {
      // fetch withdrawal details
      try {
        // Validate wallet address
        const withdrawal = await this.httpService.axiosRef.get(
          `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws/${data.quidaxTransactionId}`,
          {
            headers: {
              authorization: `Bearer ${this.configService.get<string>(
                'QDX_SECRET',
              )}`,
            },
          },
        );
        console.log(withdrawal.data);
        data['withdrawal'] = withdrawal.data.data;
        return {
          data,
        };
      } catch (error) {
        console.log(error.message);
        throw new InternalServerErrorException(error.message);
      }
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

  async getTransactionsByReferenc(reference: string) {
    const transaction = await this.transactionRepo.find({
      where: { transactionReference: reference },
    });
    if (transaction === null) {
      throw new BadRequestException('Transaction not found');
    }
    return {
      data: transaction,
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

  async getTransactions(type: number) {
    const trx = await this.transactionRepo.find({
      where: { transactionType: type },
    });
    return {
      data: trx,
    };
  }

  async getFees(currency: string) {
    try {
      // Validate wallet address
      const fees = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/fee?currency=${currency}`,
        {
          headers: {
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      console.log(fees.data);
      if (fees.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
      return {
        data: { ...fees.data },
      };
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
