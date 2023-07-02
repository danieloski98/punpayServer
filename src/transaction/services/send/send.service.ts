import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { SendDTO } from 'src/transaction/dto/send.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RefundserviceService } from 'src/transaction/refundservice/refundservice.service';

@Injectable()
export class SendService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private httpService: HttpService,
    private configService: ConfigService,
    private refundService: RefundserviceService,
  ) {}

  async sendCrypto(payload: SendDTO) {
    console.log(payload);
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
    // get withdrawalFee
    let fee = '0';
    let wallet;
    try {
      // Get Admin address for the tranfer
      const fees = await this.httpService.axiosRef.get(
        ` https://www.quidax.com/api/v1/users/me/wallets/${payload.transactionCurrency}/address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      if (fees.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
      wallet = fees.data.data.address;
      console.log(fees.data.data);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    try {
      // Validate wallet address
      const transactionfees = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/fee?currency=${payload.transactionCurrency}`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      if (transactionfees.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
      fee = transactionfees.data.data.fee;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    // make the transfer to The Admin wallet
    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
        {
          currency: payload.transactionCurrency,
          amount: fee,
          fund_uid: wallet,
          transaction_note: `withrawal fee for ${payload.transactionAmount}-${payload.transactionCurrency}`,
        },
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
    } catch (error) {
      this.refundService.addRefundransaction({
        userId: payload.userId,
        coin: payload.transactionCurrency,
        amount: fee,
      });
      throw new InternalServerErrorException(error.message);
    }

    try {
      //Validate wallet address
      const addressValid = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/${payload.transactionCurrency}/${payload.withdrawalAddress}/validate_address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      if (addressValid.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
        {
          currency: payload.transactionCurrency,
          amount: payload.transactionAmount.toString(),
          fund_uid: payload.withdrawalAddress,
          transaction_note: `withrawal of ${payload.transactionAmount}-${payload.transactionCurrency}`,
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
          // quidaxTransactionId: 'ndfnowefwbefofew',
          quidaxTransactionId: response.data.data.id,
          transactionType: TRANSACTION_TYPE.SEND,
          //hash: 'jdfboebofbwefefowefbo',
          hash: response.data.data.txid,
          status: TRANSACTION_STATUS.PROCESSING,
          transactionReference: randomUUID(),
        })
        .save();
      console.log(transaction);
      console.log(`this is from the normal transfer`);

      return {
        data: transaction,
        // ...response.data,
      };
    } catch (error) {
      //throw new InternalServerErrorException(error.message);
      console.log(`this is from the normal transfer`);
      throw new InternalServerErrorException(error.response.data.message);
      // run the queue here
    }
  }
}
