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

@Injectable()
export class SwapService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
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
          quidaxTransactionId: response.data.data.id,
          transactionType: TRANSACTION_TYPE.SWAP,
          transactionReference: randomUUID(),
          withdrawalAddress: currency.data.address,
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
      throw new InternalServerErrorException(err.response.data.message);
    }
  }
}
