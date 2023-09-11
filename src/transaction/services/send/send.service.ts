import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
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
import { FeeEntity } from 'src/transaction/entities/fees.entity';

@Injectable()
export class SendService {
  private logger = new Logger(SendService.name);
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(FeeEntity) private feeRepo: Repository<FeeEntity>,
    private httpService: HttpService,
    private configService: ConfigService,
    private refundService: RefundserviceService,
  ) {}

  async sendCrypto(payload: SendDTO) {
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

    // if (!user.KYCVerified) {
    //   throw new BadRequestException(
    //     'You have to verify your account before you will be able to witthdraw',
    //   );
    // }

    // checking if the users balance is upto the amount to send
    const fee = await this.getTransactionFee(payload.transactionCurrency);
    const walletBalance = await this.checkBalance(
      user.quidaxId,
      payload.transactionCurrency,
    );

    const transactionAmount = fee + payload.transactionAmount;

    if (transactionAmount > walletBalance) {
      throw new BadRequestException('Insufficient Balance');
    }

    const adminAddress = await this.getAdminWalletAddress(
      'me',
      payload.transactionCurrency,
    );

    // verify the wallet address
    const isAddressValid = await this.validateAddress(
      payload.transactionCurrency,
      payload.withdrawalAddress,
    );

    if (!isAddressValid) {
      throw new BadRequestException('Invalid address');
    }

    const sendMoney = await this.makeTransfer(payload);
    const sendAdminFee = await this.sendAdminFee({
      fee,
      address: adminAddress,
      currency: payload.transactionCurrency,
      transactionAmount: payload.transactionAmount,
      transactionId: sendMoney.id,
      user,
    });

    return {
      message: 'Transaction is processing',
    };
  }

  private async getTransactionFee(currency: string, forFee = false) {
    try {
      // Validate wallet address
      const transactionfees = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/fee?currency=${currency}`,
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
      const fee = +transactionfees.data.data.fee;
      if (!forFee) {
        return fee * 3;
      }
      return fee;
    } catch (error) {
      console.log(error.response.data.message);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }

  private async checkBalance(userId: string, currency: string) {
    try {
      // get wallet address
      const transaction = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/${userId}/wallets/${currency}`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      if (transaction.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
      this.logger.debug(
        `WALLET BALANCE ---${+transaction.data.data.balance}---`,
      );
      return +transaction.data.data.balance;
    } catch (error) {
      console.log(error.response.data.message);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }

  private async validateAddress(currency: string, address: string) {
    try {
      // validate wallet address
      const transaction = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/${currency}/${address}/validate_address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      if (transaction.data.data.valid) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.response.data.message);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }

  // https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}/address

  private async getAdminWalletAddress(
    id: 'me' | string,
    currency: string,
  ): Promise<string> {
    if (!SUPPORTED_CURRENCY.includes(currency)) {
      throw new BadRequestException('Currency not supported');
    }
    try {
      // validate wallet address
      const transaction = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/${id}/wallets/${currency}/address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      return transaction.data.data.address;
    } catch (error) {
      console.log(error.response.data.message);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }

  private async makeTransfer(payload: SendDTO) {
    const user = await this.userRepo.findOne({
      where: { id: payload.userId },
    });

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
      this.logger.log(
        `TRANSACTION SUCCESSFUL --------------------------------`,
      );
      return transaction;
    } catch (error) {
      console.log(error.response.data.message);
      throw new InternalServerErrorException(error.response.data.message);
    }
  }

  private async sendAdminFee({
    currency,
    fee,
    address,
    transactionAmount,
    transactionId,
    user,
  }: {
    currency: string;
    fee: number;
    address: string;
    transactionAmount: number;
    transactionId: string;
    user: UserEntity;
  }) {
    // make the transfer to The Admin wallet
    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
        {
          currency: currency,
          amount: await this.getTransactionFee(currency, true),
          fund_uid: address,
          transaction_note: `withrawal fee for ${transactionAmount}-${currency}`,
        },
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );

      // create fee
      const newFee = await this.feeRepo
        .create({
          fee: (await this.getTransactionFee(currency, true)).toString(),
          transactionId: transactionId,
          coin: currency,
        })
        .save();
      this.logger.log(`ADMIN FEE COLLECTED`);
    } catch (error) {
      // this.refundService.addRefundransaction({
      //   userId: payload.userId,
      //   coin: payload.transactionCurrency,
      //   amount: fee,
      // });
      throw new InternalServerErrorException(error.message);
    }
  }

  async getFees() {
    const fees = await this.feeRepo.find();
    return {
      data: fees,
    };
  }
}
