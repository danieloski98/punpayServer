import { RateEntity } from './Entities/rate.entity';
import { AdminEntity } from './admin-auth/Entities/admin.entity';
import { BankEntity } from './bank/Entities/bank.entity';
import { CoinEntity } from './coin/Entities/coin.entity';
import { OtpEntity } from './user-auth/Entity/otp.entity';
import { UserEntity } from './user-auth/Entity/user.entity';
import { BalanceEntity } from './user/Entities/balance.entity';
import { NextOfKinEntity } from './user/Entities/nextofKin.entity';

const entities = [
  UserEntity,
  OtpEntity,
  BalanceEntity,
  NextOfKinEntity,
  AdminEntity,
  BankEntity,
  CoinEntity,
  RateEntity,
];

export default entities;
