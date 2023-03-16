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
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/global-services/email/email.service';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';

@Injectable()
export class WebhookService {
  constructor(
    private notificationService: NotificationService,
    private emailService: EmailService,
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) {}

  private async WithdrawalRejected(body: WithdrawalRejected) {
    const transaction = await this.transactionRepo.findOne({
      where: { quidaxTransactionId: body.data.id },
    });
    const user = await this.userRepo.findOne({
      where: { id: transaction.userId },
    });
    if (transaction === null) {
      return;
    } else {
      // check transaction type
      if (transaction.transactionType === TRANSACTION_TYPE.BUY) {
        // that means the transaction failed
        // send an email to the admin informing them
        // get the admin
        const admin = await this.adminRepo.findOne({
          where: { id: transaction.adminId },
        });
        if (admin === null) {
          return;
        }
        this.emailService.generateAdminEmailNotificationCode(
          admin.email,
          `
        The payout for the BUY transaction with ID-${transaction.id} failed, please retry`,
        );
        return;
      }
      if (transaction.transactionType > 0) {
        // check if its a user transaction
        if (body.data.id === transaction.quidaxTransactionId) {
          await this.transactionRepo.update(
            { id: transaction.id },
            { status: TRANSACTION_STATUS.FAILED },
          );
          // switch the values
          switch (transaction.transactionType) {
            case 1: {
              this.emailService.generateSendUserEmail(
                user.email,
                `
                Your SELL transaction with ID-${transaction.id} failed,
                please try again
              `,
              );
              this.notificationService.sendIndieNotification(
                user.id,
                'Sell Transaction Failed',
                `
              Your SELL transaction with ID-${transaction.id} failed,
              please try again
            `,
              );
              break;
            }
            case 3: {
              this.emailService.generateSendUserEmail(
                user.email,
                `
                Your SWAP transaction with ID-${transaction.id} failed, please try again
              `,
              );
              this.notificationService.sendIndieNotification(
                user.id,
                'Swap Transaction Failed',
                `
                Your SWAP transaction with ID-${transaction.id} failed, please try again
            `,
              );
            }
            case 4: {
              this.emailService.generateSendUserEmail(
                user.email,
                `
                Your Withdrawal transaction with ID-${transaction.id} failed, please try again
              `,
              );
              this.notificationService.sendIndieNotification(
                user.id,
                'Withdrawal Transaction Failed',
                `
                Your Withdrawal transaction with ID-${transaction.id} failed, please try again
            `,
              );
            }
          }
        }
        // check if its the admin transaction
        if (body.data.id === transaction.adminQuidaxTransactionId) {
          // get the admin
          const admin = await this.adminRepo.findOne({
            where: { id: transaction.adminId },
          });
          switch (transaction.transactionType) {
            case 1: {
              this.emailService.generateSendUserEmail(
                admin.email,
                `
                Your Sell transaction payout with ID-${transaction.id} you intiated failed,
                please try again
              `,
              );
              break;
            }
            case 3: {
              this.emailService.generateSendUserEmail(
                admin.email,
                `
                Your SWAP transaction payout with ID-${transaction.id} you intialtied failed, please try again
              `,
              );
              break;
            }
            case 2: {
              this.emailService.generateAdminEmailNotificationCode(
                admin.email,
                `
                The Buy transaction payout with ID-${transaction.id} you initiatied failed, please confirm and try again try again
              `,
              );
              break;
            }
          }
        }
        return;
      }
      // update transaction status
      // await this.transactionRepo.update(
      //   { quidaxTransactionId: body.data.id },
      //   { status: TRANSACTION_STATUS.FAILED },
      // );
      // this.notificationService.sendIndieNotification(
      //   transaction.userId,
      //   'Withdrawal failed',
      //   `Transaction with ID-${transaction.id} failed, please try again`,
      // );
    }
  }
  private async withDrawalSuccessful(body: withDrawalSuccessful) {
    const transaction = await this.transactionRepo.findOne({
      where: { quidaxTransactionId: body.data.id },
    });
    if (transaction === null) {
      return;
    } else {
      if (body.data.id === transaction.adminQuidaxTransactionId) {
        // get the admin
        const admin = await this.adminRepo.findOne({
          where: { id: transaction.adminId },
        });
        switch (transaction.transactionType) {
          case 1: {
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.CONFIRMED },
            );
            this.emailService.generateSendUserEmail(
              admin.email,
              `
              Your Sell transaction payout with ID-${transaction.id} you intiated was successfull
            `,
            );
            break;
          }
          case 3: {
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.PAID },
            );
            this.emailService.generateSendUserEmail(
              admin.email,
              `
              Your SWAP transaction payout with ID-${transaction.id} you intialtied was successfull.
            `,
            );
            break;
          }
          case 2: {
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.PAID },
            );
            this.emailService.generateAdminEmailNotificationCode(
              admin.email,
              `
              The Buy transaction payout with ID-${transaction.id} you initiatied was successfull
            `,
            );
            break;
          }
        }
      }

      // if the transaction was initiated by the user
      if (body.data.id === transaction.quidaxTransactionId) {
        const user = await this.userRepo.findOne({
          where: { id: transaction.userId },
        });
        switch (transaction.transactionType) {
          case 1: {
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.CONFIRMED },
            );
            break;
          }
          case 3: {
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.CONFIRMED },
            );
            break;
          }
          case 4: {
            this.emailService.generateSendUserEmail(
              user.email,
              `
              Your Withdrawal transaction with ID-${transaction.id} was successfull
            `,
            );
            this.notificationService.sendIndieNotification(
              user.id,
              'Withdrawal Transaction Failed',
              `
              Your Withdrawal transaction with ID-${transaction.id} was successful
          `,
            );
            await this.transactionRepo.update(
              { id: transaction.id },
              { status: TRANSACTION_STATUS.PAID },
            );
            break;
          }
        }
      }
      return;
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
          transactionReference: randomUUID(),
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
