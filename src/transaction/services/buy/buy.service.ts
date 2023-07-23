import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/rate.entity';
import { ADMINROLE } from 'src/Enums/AdminRoles';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { GetCoinModel } from 'src/Models/GetCoinModel';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { NotificationService } from 'src/notification/notification.service';
import { BuyDTO } from 'src/transaction/dto/Buy.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { TRANSACTIONTYPE } from 'src/types/transactionType';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(RateEntity) private rateRepo: Repository<RateEntity>,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private httpService: HttpService,
    private notificationService: NotificationService,
  ) {}

  async initiateBuy(payload: BuyDTO) {
    console.log(payload);
    const userId = payload.userId;
    const buyTransactions = await this.transactionRepo.find({
      where: [
        {
          userId,
          transactionType: TRANSACTION_TYPE.BUY,
          status: TRANSACTION_STATUS.PENDING,
        },
        {
          userId,
          transactionType: TRANSACTION_TYPE.BUY,
          status: TRANSACTION_STATUS.PROCESSING,
        },
      ],
    });
    if (buyTransactions.length > 0) {
      throw new BadRequestException('You still have pending BUY transactions');
    }
    if (
      !SUPPORTED_CURRENCY.includes(payload.transactionCurrency) ||
      !SUPPORTED_CURRENCY.includes(payload.payoutCurrency)
    ) {
      throw new BadRequestException('Invalid currency');
    }
    // Get the rate of the currency
    // create the transaction
    const transaction = await this.transactionRepo
      .create({
        ...payload,
        bankId: +payload.bankId,
        status: TRANSACTION_STATUS.PENDING,
        transactionType: TRANSACTION_TYPE.BUY,
      })
      .save();

    // send notification
    this.notificationService.sendAdminNotification(
      `New Transaction created`,
      `A user has initiate a buy transaction`,
      ADMINROLE.TRANSACTIONS,
    );
    return {
      message: 'Transaction created',
      data: transaction,
    };
  }

  async confirmBuy(transactionId: string) {
    const transaction = await this.transactionRepo.findOne({
      where: { id: transactionId },
    });
    if (!transaction === null) {
      throw new BadRequestException('Invalid transaction ID');
    }
    // set the status to processing
    await this.transactionRepo.update(
      { id: transactionId },
      { status: TRANSACTION_STATUS.PROCESSING },
    );

    return {
      message: `Status updated`,
    };
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
            'Accept-Encoding': 'gzip,deflate,compress',
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
            'Accept-Encoding': 'gzip,deflate,compress',
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
