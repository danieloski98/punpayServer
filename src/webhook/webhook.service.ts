import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TRANSACTION_STATUS } from 'src/Enums/TRANSACTION_STATUS';
import { TRANSACTION_TYPE } from 'src/Enums/TRANSACTION_TYPE';
import { WEBHOOKS } from 'src/UTILS/Webhook.events';
import { NotificationService } from 'src/global-services/notification/notification.service';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { depositSuccessful } from 'src/types/depositsuccessful';
import { withDrawalSuccessful } from 'src/types/withdrawalApproved';
import { WithdrawalRejected } from 'src/types/withdrawalRejected';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebhookService {
  constructor(
    private notificationService: NotificationService,
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  private async WithdrawalRejected(body: WithdrawalRejected) {
    const transaction = await this.transactionRepo.findOne({
      where: { quidaxTransactionId: body.data.id },
    });
    if (transaction === null) {
      return;
    } else {
      // update transaction status
      await this.transactionRepo.update(
        { quidaxTransactionId: body.data.id },
        { status: TRANSACTION_STATUS.FAILED },
      );
      this.notificationService.sendIndieNotification(
        transaction.userId,
        'Withdrawal failed',
        `Transaction with ID-${transaction.id} failed, please try again`,
      );
    }
  }
  private async withDrawalSuccessful(body: withDrawalSuccessful) {
    const transaction = await this.transactionRepo.findOne({
      where: { quidaxTransactionId: body.data.id },
    });
    if (transaction === null) {
      return;
    } else {
      // update transaction status
      await this.transactionRepo.update(
        { quidaxTransactionId: body.data.id },
        { status: TRANSACTION_STATUS.PAID },
      );
      this.notificationService.sendIndieNotification(
        transaction.userId,
        'Withdrawal successfull',
        `Transaction with ID-${transaction.id} failed, please try again`,
      );
    }
  }
  private async depositSuccessful(body: depositSuccessful) {
    const user = await this.userRepo.findOne({
      where: { quidaxId: body.data.user.id },
    });

    if (user === null) {
      return;
    } else {
      // create a deposit Transaction
      await this.transactionRepo
        .create({
          transactionAmount: +body.data.amount,
          transactionCurrency: body.data.currency,
          hash: body.data.txid,
          userId: user.id,
          quidaxTransactionId: body.data.id,
          status: TRANSACTION_STATUS.PAID,
          transactionType: TRANSACTION_TYPE.RECIEVED,
        })
        .save();
      await this.notificationService.sendIndieNotification(
        user.id,
        'Deposit Successful',
        `
          A deposit of ${body.data.amount}-${body.data.currency} was made to your wallet
          ${body.data.wallet.deposit_address}
        `,
      );
    }
  }

  async handleWebHook(body: any) {
    switch (body.event) {
      case WEBHOOKS.DEPOSIT_SUCCESSFUL: {
        this.depositSuccessful(body);
        break;
      }
      case WEBHOOKS.WITHDRAWAL_SUCCESSFUL: {
        this.withDrawalSuccessful(body);
        break;
      }
      case WEBHOOKS.WITHDRAWAL_REJECTED: {
        this.WithdrawalRejected(body);
        break;
      }
    }
    return 'done';
  }
}
