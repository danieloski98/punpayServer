import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { NotificationService } from 'src/global-services/notification/notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity]),
    HttpModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService, NotificationService],
})
export class WebhookModule {}
