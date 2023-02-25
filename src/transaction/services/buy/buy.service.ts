import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/Rate.entity';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';
import { BankEntity } from 'src/bank/Entities/Bank.entity';
import { BuyDTO } from 'src/transaction/dto/Buy.dto';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { TRANSACTIONTYPE } from 'src/types/transactionType';
import { Repository } from 'typeorm';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(RateEntity) private rateRepo: Repository<RateEntity>,
  ) {}

  async initiateBuy(payload: BuyDTO) {
    if (
      !SUPPORTED_CURRENCY.includes(payload.transaction_currency) ||
      !SUPPORTED_CURRENCY.includes(payload.payout_currency)
    ) {
      throw new BadRequestException('Invalid currency');
    }
    // Get the rate of the currency
    const rate = await this.rateRepo.findOne({
      where: { currency: payload.payout_currency, type: 'BUY' },
    });
    if (rate === null) {
      throw new BadRequestException('Invalid Rate');
    }
    // create the transaction
    const transaction = await this.transactionRepo
      .create({
        ...payload,
        status: TRANSACTION_STATUS.PENDING,
        transactionType: TRANSACTION_TYPE.BUY,
      })
      .save();
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
}
