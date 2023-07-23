import { Module } from '@nestjs/common';
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
import { NotificationService } from './global-services/notification/notification.service';
import { HttpModule } from '@nestjs/axios';
import { dataSourceOptions } from 'db/data-source';
import { WebhookModule } from './webhook/webhook.module';
import { VerificationModule } from './verification/verification.module';
import { NotificationsService } from './global-services/notifications/notifications.service';
import { NotificationModule } from './notification/notification.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 60,
    // }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    HttpModule.register({
      headers: {
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    }),
    UserAuthModule,
    UserModule,
    BankModule,
    AdminAuthModule,
    RateModule,
    CoinModule,
    TransactionModule,
    AdminModule,
    WebhookModule,
    VerificationModule,
    NotificationModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    NotificationService,
    NotificationsService,
  ],
})
export class AppModule {}
