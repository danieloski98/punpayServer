import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceEntity } from 'src/user/Entities/Balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepo: Repository<BalanceEntity>,
  ) {}

  async getBalance(id: string) {
    const balance = await this.balanceRepo.findOne({ where: { userId: id } });

    if (balance === undefined) {
      throw new BadRequestException('Record not found');
    }
    return {
      messgae: 'Balance',
      data: balance,
    };
  }
}
