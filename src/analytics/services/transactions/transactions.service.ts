import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import moment from 'moment';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
  ) {}

  async filterTransactions(
    status: number,
    filter: 'daily' | 'monthly' | 'yearly',
    startDate?: string,
    endDate?: string,
    // transactionType: number,
    // status: number,
  ) {
    if (startDate) {
      const startDay = moment(startDate).startOf('day');
      const endDay = moment(endDate ? endDate : Date.now()).endOf('day');
      if (status > -1) {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('transaction.createdAt <= :before', {
            before: moment(endDay).endOf('day').format('YYYY-MM-DD'),
          })
          // .andWhere('transactionType = :type', { type: transactionType })
          .andWhere('status = :status', { status })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('transaction.createdAt <= :before', {
            before: moment(endDay).endOf('day').format('YYYY-MM-DD'),
          })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          // .andWhere('transactionType = :type', { type: transactionType })
          // .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      }
    }
    const startDay = moment(new Date().toISOString()).subtract(2, 'day');
    const date = moment();
    if (filter === 'daily') {
      if (status > -1) {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          // .andWhere('createdAt <= :before', {
          //   before: moment().endOf('day').format('YYYY-MM-DD'),
          // })
          // .andWhere('transactionType = :type', { type: transactionType })
          // .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      }
    } else if (filter === 'monthly') {
      if (status > -1) {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('month').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(startDay).startOf('month').format('YYYY-MM-DD'),
          })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          // .andWhere('createdAt <= :before', {
          //   before: moment().endOf('month').format('YYYY-MM-DD'),
          // })
          // .andWhere('transactionType = :type', { type: transactionType })
          // .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      }
    } else if (filter === 'yearly') {
      if (status > -1) {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(date).startOf('year').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder('transaction')
          .where('transaction.createdAt >= :after', {
            after: moment(date).startOf('year').format('YYYY-MM-DD'),
          })
          .leftJoinAndSelect('transaction.user', 'user')
          .orderBy('transaction.createdAt', 'DESC')
          // .andWhere('createdAt <= :before', {
          //   before: moment().endOf('year').format('YYYY-MM-DD'),
          // })
          // .andWhere('transactionType = :type', { type: transactionType })
          // .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      }
    } else {
      let data;
      if (status > -1) {
        data = await this.transactionRepo.find({
          where: { status },
          relations: ['user'],
        });
      } else {
        data = await this.transactionRepo.find({
          relations: ['user'],
        });
      }
      return {
        data,
      };
    }
  }

  async getTransactionAnalytics(coin: string) {
    console.log(`this is the coin ${coin}`);
    // if (coin !== 'NONE' || !SUPPORTED_CURRENCY.includes(coin)) {
    //   throw new BadRequestException('Invalid query');
    // }
    if (coin !== 'NONE') {
      const totalWithDrawal = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.SEND,
          transactionCurrency: coin,
        },
      });

      const totalDeposits = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.RECIEVED,
          transactionCurrency: coin,
        },
      });

      const totalBuy = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.BUY,
          payoutCurrency: coin,
        },
      });

      const totalSell = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.SELL,
          transactionCurrency: coin,
        },
      });

      return {
        data: {
          totalWithDrawal: totalWithDrawal[0].reduce(
            (acc, currr) => acc + currr.transactionAmount,
            0,
          ),
          totalBuy: totalBuy[0].reduce(
            (acc, curr) => acc + curr.payoutAmount,
            0,
          ),
          totalDeposits: totalDeposits[0].reduce(
            (acc, curr) => acc + curr.transactionAmount,
            0,
          ),
          totalSell: totalSell[0].reduce(
            (acc, curr) => acc + curr.transactionAmount,
            0,
          ),
        },
      };
    }
    if (coin === 'NONE') {
      const totalWithDrawal = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.SEND,
        },
      });

      const totalDeposits = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.RECIEVED,
        },
      });

      const totalBuy = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.BUY,
        },
      });

      const totalSell = await this.transactionRepo.findAndCount({
        where: {
          transactionType: TRANSACTION_TYPE.SELL,
        },
      });

      return {
        data: {
          totalWithDrawal: totalWithDrawal[1],
          totalBuy: totalBuy[1],
          totalDeposits: totalDeposits[1],
          totalSell: totalSell[1],
        },
      };
    }
  }
}
