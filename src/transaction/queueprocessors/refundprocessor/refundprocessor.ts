import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { IRefund } from 'src/transaction/refundservice/refundservice.service';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';

@Processor('refund')
export class Refundprocessor {
  constructor(
    private httpService: HttpService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  @Process()
  async refund(job: Job<IRefund>) {
    let wallet;
    const user = await this.userEntity.findOne({
      where: { id: job.data.userId },
    });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    // make transaction
    // make the transfer to The Admin wallet
    // get the user Wallet
    try {
      // Get Admin address for the tranfer
      const request = await this.httpService.axiosRef.get(
        ` https://www.quidax.com/api/v1/users/me/wallets/${job.data.coin}/address`,
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${this.configService.get<string>(
              'QDX_SECRET',
            )}`,
          },
        },
      );
      if (request.data.status !== 'success') {
        throw new BadRequestException('Invalid Address');
      }
      wallet = request.data.data.address;
      console.log(request.data.data);
    } catch (error) {
      await job.retry();
      throw new InternalServerErrorException(error.message);
    }
    try {
      const response = await this.httpService.axiosRef.post(
        `https://www.quidax.com/api/v1/users/${user.quidaxId}/withdraws`,
        {
          currency: job.data.coin,
          amount: job.data.amount,
          fund_uid: wallet,
          transaction_note: `refund for failed send transaction fee for ${job.data.amount}-${job.data.coin}`,
        },
        {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
            authorization: `Bearer ${process.env.QDX_SECRET}`,
          },
        },
      );
      job.moveToCompleted();
    } catch (error) {
      await job.retry();
      console.log(`this is from the admin transfer`);
      throw new InternalServerErrorException(error.message);
    }
  }
}
