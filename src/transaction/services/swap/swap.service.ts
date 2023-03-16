import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { SellService } from '../sell/sell.service';
import { SwapDTO } from 'src/transaction/dto/swap.dto';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { AxiosError } from 'axios';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { randomUUID } from 'crypto';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { GetCoinModel } from 'src/Models/GetCoinModel';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';

@Injectable()
export class SwapService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    private httpService: HttpService,
    private sellService: SellService,
  ) {}

  async swapTransaction(payload: SwapDTO) {
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
    const currency = await this.sellService.fetchAdminAddress(
      payload.payoutCurrency,
    );
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
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      // create the withdrawal in the database
      const transaction = await this.transactionRepo
        .create({
          ...payload,
          //quidaxTransactionId: 'edneodnowefnowef',
          quidaxTransactionId: response.data.data.id,
          transactionType: TRANSACTION_TYPE.SWAP,
          transactionReference: randomUUID(),
          // withdrawalAddress: 'efwefwefwfe',
          withdrawalAddress: currency.data.address,
          //hash: 'depindwefnowefnw',
          hash: response.data.data.txid,
          status: TRANSACTION_STATUS.PROCESSING,
        })
        .save();
      console.log(transaction);
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

  // transafer from the admin to the user
  async adminPayout(transactionId: string, adminId: string) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (admin === null) {
      throw new BadRequestException('Admin not found');
    }
    const transaction = await this.transactionRepo.findOne({
      where: { id: transactionId },
    });
    if (transaction === null) {
      throw new BadRequestException('Admin not found');
    }
    if (transaction.transactionType !== TRANSACTION_TYPE.BUY) {
      throw new BadRequestException('This is not a BUY transactions');
    }
    // mark the transaction as confirmed
    // const updateTransaction = await this.transactionRepo.update(
    //   { id: transactionId },
    //   { status: TRANSACTION_STATUS.CONFIRMED },
    // );
    const user = await this.userRepo.findOne({
      where: { id: transaction.userId },
    });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    let userCoin: GetCoinModel;
    // get main wallet address
    try {
      const coinresponse = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/wallets/${transaction.payoutCurrency}`,
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      userCoin = coinresponse.data;
      // return coinresponse.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/me/withdraws`,
        {
          currency: transaction.payoutCurrency,
          amount: transaction.payoutAmount,
          fund_uid: userCoin.data.deposit_address,
          transaction_note: `payout of ${transaction.payoutAmount}-${transaction.payoutCurrency}`,
        },
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      await this.transactionRepo.update(
        { id: transactionId },
        {
          adminQuidaxTransactionId: response.data.data.id,
          adminId: admin.id,
        },
      );
      return {
        message: 'Payout processing',
        data: { ...response.data },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }
}
