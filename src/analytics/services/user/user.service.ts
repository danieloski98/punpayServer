import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
  ) {}

  async getUserAnalytics() {
    const TOTAL_USERS = await this.userRepo.count();
    const VERRIFIED = await this.userRepo.findAndCountBy({ KYCVerified: true });
    const ALLTRANSACTIONS = await this.transactionRepo.count();
    const PENDING_TRANSACTIONS = await this.transactionRepo.findAndCountBy({
      status: TRANSACTION_STATUS.PENDING,
    });

    const APPROVE_TRANSACTIONS = await this.transactionRepo.findAndCountBy({
      status: TRANSACTION_STATUS.CONFIRMED,
    });

    const CANCELLED_TRANSACTIONS = await this.transactionRepo.findAndCountBy({
      status: TRANSACTION_STATUS.CANCELLED,
    });

    const NOT_VERRIFIED = await this.userRepo.findAndCount({
      where: { KYCVerified: false },
    });

    return {
      data: {
        TOTAL_USERS,
        VERRIFIED: VERRIFIED[1],
        NOT_VERRIFIED: NOT_VERRIFIED[1],
        ALLTRANSACTIONS,
        PENDING_TRANSACTIONS: PENDING_TRANSACTIONS[1],
        APPROVE_TRANSACTIONS: APPROVE_TRANSACTIONS[1],
        CANCELLED_TRANSACTIONS: CANCELLED_TRANSACTIONS[1],
      },
    };
  }
}
