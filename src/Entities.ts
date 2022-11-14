import { OtpEntity } from './user-auth/Entity/Otp.Entity';
import { UserEntity } from './user-auth/Entity/User.entity';
import { BalanceEntity } from './user/Entities/Balance.entity';
import { NextOfKinEntity } from './user/Entities/NextofKin.entity';

const entities = [UserEntity, OtpEntity, BalanceEntity, NextOfKinEntity];

export default entities;
