import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BanksService } from './services/banks/banks.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from './Entities/bank.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([BankEntity, UserEntity])],
  controllers: [BankController],
  providers: [BanksService],
})
export class BankModule {}
