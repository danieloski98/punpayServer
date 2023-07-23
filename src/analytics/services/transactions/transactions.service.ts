import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import moment from 'moment';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
  ) {}

  async filterTransactions(
    filter: 'daily' | 'monthly' | 'yearly',
    // transactionType: number,
    // status: number,
  ) {
    const startDay = moment(new Date().toISOString()).subtract(2, 'day');
    const date = moment();
    if (filter === 'daily') {
      const data = await this.transactionRepo
        .createQueryBuilder()
        .where('createdAt >= :after', {
          after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
        })
        // .andWhere('createdAt <= :before', {
        //   before: moment().endOf('day').format('YYYY-MM-DD'),
        // })
        // .andWhere('transactionType = :type', { type: transactionType })
        // .andWhere('status = :status', { status })
        .getMany();
      return {
        data,
      };
    } else if (filter === 'monthly') {
      const data = await this.transactionRepo
        .createQueryBuilder()
        .where('createdAt >= :after', {
          after: moment(date).startOf('month').format('YYYY-MM-DD'),
        })
        .andWhere('createdAt < :before', {
          before: moment(date).endOf('month').format('YYYY-MM-DD'),
        })
        // .andWhere('transactionType = :type', { type: transactionType })
        // .andWhere('status = :status', { status })
        .getMany();
      return {
        data,
      };
    } else {
      const data = await this.transactionRepo
        .createQueryBuilder()
        .where('createdAt >= :after', {
          after: moment(date).startOf('year').format('YYYY-MM-DD'),
        })
        .andWhere('createdAt < :before', {
          before: moment(date).endOf('year').format('YYYY-MM-DD'),
        })
        // .andWhere('transactionType = :type', { type: transactionType })
        // .andWhere('status = :status', { status })
        .getMany();
      return {
        data,
      };
    }
  }
}
