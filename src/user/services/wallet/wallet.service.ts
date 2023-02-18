import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { quidax } from 'src/UTILS/quidax';
import { Wallet } from 'src/types/wallet';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { Repository } from 'typeorm';
const WALLETS = [
  'btc',
  'eth',
  'usdt',
  'busd',
  'bnb',
  'xrp',
  'doge',
  'ltc',
  // 'dot',
];
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getWallets(userId: string) {
    try {
      const neededWallets = [];
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (user === null) {
        throw new BadRequestException('User not found');
      }
      const data = await quidax.wallets.fetchAllWallets(user.quidaxId);
      if (data) {
        const wallets: Array<Wallet> = data.data;
        wallets.map((item) => {
          if (WALLETS.includes(item.currency)) {
            neededWallets.push(item);
          }
        });
        return {
          message: 'wallets',
          data: neededWallets,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getWalletById(userId: string, currency: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (user === null) {
        throw new BadRequestException('User not found');
      }
      const data = await quidax.wallets.fetchCurrencyWallet(
        user.quidaxId,
        currency,
      );

      const cur: Wallet = data.data;
      if (cur.deposit_address === null) {
        await quidax.wallets.createPaymentAddress(user.quidaxId, currency);

        const data2 = await quidax.wallets.fetchCurrencyWallet(
          user.quidaxId,
          currency,
        );

        return {
          message: 'wallet address',
          data: {
            ...data2.data,
          },
        };
      } else {
        return {
          message: 'wallet address',
          data: {
            ...cur,
          },
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
