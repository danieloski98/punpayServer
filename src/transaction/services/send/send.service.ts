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

@Injectable()
export class SendService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private httpService: HttpService,
  ) {}

  async sendCrypto(payload: SendDTO) {
    // verify the user
    const user = await this.userRepo.findOne({
      where: { id: payload.userId },
    });
    console.log(user);
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    if (!SUPPORTED_CURRENCY.includes(payload.transactionCurrency)) {
      throw new BadRequestException('Currency not supported');
    }

    try {
      // Validate wallet address
      const addressValid = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/${payload.transactionCurrency}/${payload.withdrawalAddress}/validate_address`,
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      console.log(addressValid.data);
      if (addressValid.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }

    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
        {
          currency: payload.transactionCurrency,
          amount: payload.transactionAmount,
          fund_uid: payload.withdrawalAddress,
          transaction_note: `withrawal of ${payload.transactionAmount}-${payload.transactionCurrency}`,
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
          transactionType: TRANSACTION_TYPE.SEND,
          hash: response.data.data.txid,
        })
        .save();
      console.log(transaction);
      return {
        ...response.data,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.response.data.message);
    }
  }
}
