import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COIN_TYPE } from 'src/Enums/COIN_TYPE';
import { CoinEntity } from 'src/coin/Entities/Coin';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { Repository } from 'typeorm';

const coins = [
  COIN_TYPE.BITCOIN,
  COIN_TYPE.ETHEREUEM,
  COIN_TYPE.USDT,
  COIN_TYPE.DOGE,
  COIN_TYPE.XRP,
  COIN_TYPE.BND,
];

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(CoinEntity) private coinRepo: Repository<CoinEntity>,
  ) {}

  async createCoinsForUser(userId: string) {
    for (let i = 0; i < coins.length; i++) {
      await this.coinRepo
        .create({
          address: 'X0wdnowdnodnnqdonqd',
          amount: 0,
          coinType: coins[i],
          network: 'BEP20',
          userId,
        })
        .save();
    }
    return {
      message: 'Accounts created',
    };
  }

  async getCoins(userId: string) {
    const coins = await this.coinRepo.find({ where: { userId } });
    if (coins.length < 1) {
      throw new BadRequestException("You haven't created your addresses");
    }
    return {
      message: 'Coins',
      data: coins,
    };
  }

  async getCoinById(coinId: string) {
    const coin = await this.coinRepo.findOne({ where: { id: coinId } });
    if (coin === null) {
      throw new BadRequestException('coin not found');
    }
    return {
      message: 'Coins',
      data: coin,
    };
  }
}
