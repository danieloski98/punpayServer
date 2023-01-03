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
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import Entities from './Entities';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: process.env.DB_USER,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      url: process.env.DATABASE_URI,
      logging: false,
      synchronize: true,
      entities: Entities,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserAuthModule,
    UserModule,
    BankModule,
    AdminAuthModule,
    RateModule,
    CoinModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
