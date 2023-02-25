import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { quidax } from 'src/UTILS/quidax';
import { Wallet } from 'src/types/wallet';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { BalanceEntity } from 'src/user/Entities/balance.entity';
import { Repository } from 'typeorm';

const WALLETS = ['btc', 'eth', 'usdt', 'busd', 'bnb', 'xrp', 'doge'];
@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepo: Repository<BalanceEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getBalance(id: string) {
    let balance = 0;
    const user = await this.userRepo.findOne({ where: { id } });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    const data = await quidax.wallets.fetchAllWallets(user.quidaxId);
    if (data) {
      const wallets: Array<Wallet> = data.data;
      wallets.map((item) => {
        if (WALLETS.includes(item.currency)) {
          balance += +item.converted_balance;
        }
      });
      return {
        message: 'balance',
        data: {
          balance,
        },
      };
    }
    return {
      messgae: 'Balance',
      data: balance,
    };
  }
}
