import { AdminEntity } from './admin-auth/Entities/Admin.Entity';
import { BankEntity } from './bank/Entities/Bank';
import { CoinEntity } from './coin/Entities/Coin';
import { OtpEntity } from './user-auth/Entity/Otp.Entity';
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
];

export default entities;
