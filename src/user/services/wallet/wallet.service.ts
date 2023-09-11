import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { quidax } from 'src/UTILS/quidax';
import { NewWallet, Wallet } from 'src/types/wallet';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
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
    private httpService: HttpService,
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

  async getAddress(userId: string, currency: string, network: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    try {
      const request = await this.httpService.axiosRef.get(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/wallets/${currency}/addresses`,
        {
          headers: {
            authorization: `Bearer ${process.env.QDX_SECRET}`,
            'Accept-Encoding': 'gzip,deflate,compress',
          },
        },
      );
      // .catch((error) => {
      //   console.log(error.response);
      //   return error.response;
      // });
      const data = request.data.data as NewWallet[];
      //console.log(request.data.data);
      const wallet = await data.filter((item) => item.network === network)[0];
      console.log(wallet);

      if (wallet === null || wallet === undefined) {
        try {
          // create new wallet
          const newWallet = await this.httpService.axiosRef.post(
            `https://www.quidax.com/api/v1/users/${user.quidaxId}/wallets/${currency}/addresses?network=${network}`,
            {},
            {
              headers: {
                authorization: `Bearer ${process.env.QDX_SECRET}`,
                'Accept-Encoding': 'gzip,deflate,compress',
              },
            },
          );
          // .catch((error) => {
          //   return error.response;
          // });

          if (newWallet.data.data.address === null) {
            const request = await this.httpService.axiosRef.get(
              `https://www.quidax.com/api/v1/users/${user.quidaxId}/wallets/${currency}/addresses`,
              {
                headers: {
                  authorization: `Bearer ${process.env.QDX_SECRET}`,
                  'Accept-Encoding': 'gzip,deflate,compress',
                },
              },
            );
            // .catch((error) => {
            //   console.log(error.response);
            //   return error.response.message;
            // });
            const data = request.data.data as NewWallet[];
            //console.log(request.data.data);
            const wallet = await data.filter(
              (item) => item.network === network,
            )[0];

            return {
              data: wallet,
            };
          }
          return this.getAddress(user.id, currency, network);
        } catch (error) {
          console.log(error);
          throw new BadRequestException(`${error.response.data.message}`);
        }
      }

      return {
        data: wallet,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.response);
    }
  }
}
