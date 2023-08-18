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
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('createdAt <= :before', {
            before: moment(endDay).endOf('day').format('YYYY-MM-DD'),
          })
          // .andWhere('transactionType = :type', { type: transactionType })
          .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('createdAt <= :before', {
            before: moment(endDay).endOf('day').format('YYYY-MM-DD'),
          })
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
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(startDay).startOf('day').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      } else {
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
      }
    } else if (filter === 'monthly') {
      if (status > -1) {
        const data = await this.transactionRepo
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(startDay).startOf('month').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
          .getMany();
        return {
          data,
        };
      } else {
        const data = await this.transactionRepo
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(startDay).startOf('month').format('YYYY-MM-DD'),
          })
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
          .createQueryBuilder()
          .where('createdAt >= :after', {
            after: moment(date).startOf('year').format('YYYY-MM-DD'),
          })
          .andWhere('status = :status', { status })
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
        });
      } else {
        data = await this.transactionRepo.find({});
      }
      return {
        data,
      };
    }
  }
}
