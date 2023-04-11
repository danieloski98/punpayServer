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
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';

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
    const data = await this.transactionRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!data === null) {
      throw new BadRequestException('Transaction not found');
    }
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    if (user === null) {
      throw new BadRequestException('user not found');
    }
    // get the wallet address of the user
    let walletAddress = '';
    try {
      const request = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/wallets/${data.payoutCurrency}`,
        {
          headers: {
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      walletAddress = request.data.data.deposit_address;
      console.log(request.data.data);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
    // check the try of transaction
    if (data.transactionType === TRANSACTION_TYPE.BUY) {
      const bank = await this.bankRepo.findOne({
        where: { id: data.bankId.toString() },
      });
      data['bank'] = bank;
      data['withdrawalAddress'] = walletAddress;
      delete data['user'].password;
      delete data['user'].pin;
      console.log(data);
      return { data: { ...data, withdrawalAddress: walletAddress } };
    }
    if (data.transactionType === TRANSACTION_TYPE.RECIEVED) {
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
    if (
      data.transactionType === TRANSACTION_TYPE.SELL ||
      data.transactionType === TRANSACTION_TYPE.SEND ||
      data.transactionType === TRANSACTION_TYPE.SWAP
    ) {
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
        data['withdrawalAddress'] = walletAddress;
        delete data['user'].password;
        delete data['user'].pin;
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

  async getTransactionsForPaticularCoin(
    userId: string,
    currency: string,
    type: number = undefined,
  ) {
    console.log(type);
    if (type !== undefined) {
      const transactions = await this.transactionRepo.find({
        where: [
          { userId, payoutCurrency: currency, transactionType: type },
          { userId, transactionCurrency: currency, transactionType: type },
        ],
      });
      const newTransactions = _.uniq(transactions);
      return {
        data: newTransactions,
      };
    }
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
    if (type === TRANSACTION_TYPE.BUY) {
      const trx = await this.transactionRepo.find({
        where: { transactionType: type },
        relations: ['user', 'user.bank'],
      });
      return { data: trx };
    }
    if (type === TRANSACTION_TYPE.SELL || type === TRANSACTION_TYPE.SWAP) {
      const trx = await this.transactionRepo.find({
        where: { transactionType: type },
        relations: ['user'],
      });
      // get wallet address
      return { data: trx };
    }
    const trx = await this.transactionRepo.find({
      where: { transactionType: type },
    });
    return {
      data: trx,
    };
  }

  async getAllTransactions() {
    const trx = await this.transactionRepo.find({
      relations: ['user'],
    });
    return {
      data: trx,
    };
  }

  async getFees(currency: string) {
    try {
      // Validate wallet address
      // const fees = await this.httpService.axiosRef.get(
      //   `https://www.quidax.com/api/v1/fee?currency=${currency}`,
      //   {
      //     headers: {
      //       authorization: `Bearer ${this.configService.get<string>(
      //         'QDX_SECRET',
      //       )}`,
      //     },
      //   },
      // );
      // console.log(fees.data);
      // if (fees.data.status !== 'success') {
      //   throw new BadRequestException('Invalid Address');
      // }
      // const fee = fees.data.data.fee * 2;
      // return {
      //   data: { fee },
      // };
      // Get Admin address for the tranfer
      const fees = await this.httpService.axiosRef.get(
        ` https://www.quidax.com/api/v1/users/me/wallets/${currency}/address`,
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
      // fee = fees.data.data.fee;
      return { data: { address: fees.data.data.address } };
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
