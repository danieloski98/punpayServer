import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { NotificationService } from 'src/global-services/notification/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/global-services/email/email.service';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, AdminEntity]),
    HttpModule,
    NotificationModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService, NotificationService, EmailService],
})
export class WebhookModule {}
