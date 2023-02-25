import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthModule } from './user-auth/user-auth.module';
import { EmailService } from './global-services/email/email.service';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { RateModule } from './rate/rate.module';
import { CoinModule } from './coin/coin.module';
import { TransactionModule } from './transaction/transaction.module';
import { AdminModule } from './admin/admin.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import Entities from './Entities';
import { NotificationService } from './global-services/notification/notification.service';
import { HttpModule } from '@nestjs/axios';
import { dataSourceOptions } from 'db/data-source';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UserAuthModule,
    UserModule,
    BankModule,
    AdminAuthModule,
    RateModule,
    CoinModule,
    TransactionModule,
    AdminModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, NotificationService],
})
export class AppModule {}
