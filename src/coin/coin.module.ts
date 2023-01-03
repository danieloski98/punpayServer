import { Module } from '@nestjs/common';
import { CoinService } from './services/coin/coin.service';
import { CoinController } from './coin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { CoinEntity } from './Entities/Coin';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CoinEntity])],
  providers: [CoinService],
  controllers: [CoinController],
})
export class CoinModule {}
