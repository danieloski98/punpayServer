import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { SellDTO } from 'src/transaction/dto/sell.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { NotificationService } from 'src/notification/notification.service';
import { ADMINROLE } from 'src/Enums/AdminRoles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    private httpService: HttpService,
    private notificationService: NotificationService,
  ) {}

  async fetchAdminAddress(currency: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/me/wallets/${currency}/address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
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
      if (!SUPPORTED_CURRENCY.includes(payload.transactionCurrency)) {
        throw new BadRequestException('Currency not supported');
      }
      // get ths admin currency
      const currency = await this.fetchAdminAddress(
        payload.transactionCurrency,
      );
      console.log(currency);
      if (true) {
        // create the transaction on quidax
        try {
          const response = await this.httpService.axiosRef.post(
            `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
            {
              currency: payload.transactionCurrency,
              amount: payload.transactionAmount,
              fund_uid: currency.data.address,
              transaction_note: `Payment of ${payload.transactionAmount}-${payload.transactionCurrency}`,
            },
            {
              headers: {
                'Accept-Encoding': 'gzip,deflate,compress',
                authorization: `Bearer ${process.env.QDX_SECRET}`,
              },
            },
          );
          // create the withdrawal in the database
          const transaction = await this.transactionRepo
            .create({
              ...payload,
              // quidaxTransactionId: 'ednew30h203h3r',
              quidaxTransactionId: response.data.data.id,
              transactionType: TRANSACTION_TYPE.SELL,
              transactionReference: randomUUID(),
              // withdrawalAddress: 'lrfnrfwnfowfowebfefbwoefbwf',
              withdrawalAddress: currency.data.address,
              //hash: 'odbodb3br23b023r2',
              hash: response.data.data.txid,
              status: TRANSACTION_STATUS.PROCESSING,
            })
            .save();
          console.log(transaction);
          // send notification
          this.notificationService.sendAdminNotification(
            `New Transaction created`,
            `A user has initiate a sell transaction`,
            ADMINROLE.TRANSACTIONS,
          );
          return {
            message: 'Transaction is processing',
            data: transaction,
          };
        } catch (error: any) {
          const err = error as AxiosError<any, any>;
          //throw new InternalServerErrorException(error.message);
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // mark sell transaction as done
  async markTransactionAsDone(transactionId: string, adminId: string) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    const transaction = await this.transactionRepo.findOne({
      where: { id: transactionId },
    });
    if (admin === null) {
      throw new BadRequestException('Admin not found');
    }

    if (transaction === null) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.status !== TRANSACTION_STATUS.CONFIRMED) {
      throw new BadRequestException('This transaction is still been processed');
    } else {
      // mark as complete
      await this.transactionRepo.update(
        { id: transactionId },
        { status: TRANSACTION_STATUS.PAID, adminId },
      );
      return {
        message: 'Transaction completed',
      };
    }
  }
}
