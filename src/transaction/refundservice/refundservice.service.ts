import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export interface IRefund {
  userId: string;
  coin: string;
  amount: string;
}

@Injectable()
export class RefundserviceService {
  constructor(@InjectQueue('refund') private refundQueue: Queue) {}

  async addRefundransaction({ userId, coin, amount }: IRefund) {
    const job = await this.refundQueue.add(
      {
        userId,
        coin,
        amount,
      },
      {
        priority: 1,
        attempts: 1,
      },
    );
    return job;
  }
}
