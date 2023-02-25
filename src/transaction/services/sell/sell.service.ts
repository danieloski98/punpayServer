import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { SellDTO } from 'src/transaction/dto/sell.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    private httpService: HttpService,
  ) {}

  async fetchAdminAddress(currency: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/me/wallets/${currency}/address`,
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sellCrypto(payload: SellDTO) {
    try {
      // verify the user
      const user = await this.userRepo.findOne({
        where: { id: payload.userId },
      });
      if (user === null) {
        throw new BadRequestException('User not found');
      }
      if (!SUPPORTED_CURRENCY.includes(payload.transaction_currency)) {
        throw new BadRequestException('Currency not supported');
      }
      // get ths admin currency
      const currency = await this.fetchAdminAddress(
        payload.transaction_currency,
      );
      console.log(currency);
      if (currency !== undefined || currency !== null) {
        // create the transaction on quidax
        try {
          const response = await this.httpService.axiosRef.post(
            `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
            {
              currency: payload.transaction_currency,
              amount: payload.transaction_amount,
              fund_uid: currency.data.address,
              transaction_note: `Payment of ${payload.transaction_amount}-${payload.transaction_currency}`,
            },
            {
              headers: {
                authorization: `Bearer ${process.env.QDX_SECRET}`,
              },
            },
          );
          // create the withdrawal in the database
          const transaction = await this.transactionRepo
            .create({
              ...payload,
              quidaxTransactionId: response.data.data.id,
            })
            .save();
          console.log(transaction);
          return {
            ...response.data,
          };
        } catch (error: any) {
          const err = error as AxiosError<any, any>;
          throw new InternalServerErrorException(err.response.data.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
