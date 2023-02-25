import { RateEntity } from './Entities/Rate.entity';
import { AdminEntity } from './admin-auth/Entities/Admin.entity';
import { BankEntity } from './bank/Entities/Bank.entity';
import { CoinEntity } from './coin/Entities/Coin.entity';
import { OtpEntity } from './user-auth/Entity/Otp.entity';
import { UserEntity } from './user-auth/Entity/User.entity';
import { BalanceEntity } from './user/Entities/Balance.entity';
import { NextOfKinEntity } from './user/Entities/NextofKin.entity';

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
