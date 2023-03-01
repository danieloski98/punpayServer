import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/rate.entity';
import { Repository } from 'typeorm';
import { CreateRateDto } from '../dto/createrate.dto';
import { SUPPORTED_CURRENCY } from 'src/UTILS/supportedcoins';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity) private rateRepo: Repository<RateEntity>,
  ) {}

  async getSupportedCurrencies() {
    return {
      message: 'currencies',
      data: SUPPORTED_CURRENCY,
    };
  }

  async getRates() {
    const rates = await this.rateRepo.find();
    return {
      message: 'rates',
      data: rates,
    };
  }

  async getRate(currency: string, type: string) {
    if (!SUPPORTED_CURRENCY.includes(currency)) {
      throw new BadRequestException('Currency not supported');
    }

    const arr = ['buy', 'sell'];

    if (!arr.includes(type)) {
      throw new BadRequestException('Invalid rate type');
    }
    const currency_available = await this.rateRepo.findOne({
      where: { currency, type },
    });

    if (currency_available === null || currency_available === undefined) {
      throw new BadRequestException(
        'Rate for this currency has npt been created',
      );
    }

    return {
      message: 'Currency',
      data: currency_available,
    };
  }

  async createRate(payload: CreateRateDto) {
    if (!SUPPORTED_CURRENCY.includes(payload.currency)) {
      throw new BadRequestException('Currency not supported');
    }
    const exists = await this.rateRepo.findOne({
      where: { type: payload.type, currency: payload.currency },
    });
    console.log(exists);
    if (exists !== null) {
      throw new BadRequestException('Rate for this currency already exists');
    }

    const data = this.rateRepo.create(payload);
    await this.rateRepo.save(data);
    return {
      message: 'Rate Created',
      data,
    };
  }

  async updateRate(id: string, rate: number) {
    const exists = await this.rateRepo.findOne({ where: { id } });
    if (exists === null || exists !== undefined) {
      throw new BadRequestException('Rate not found');
    }

    await this.rateRepo.update({ id }, { rate });

    return {
      message: `currency ${exists.currency} rate updated`,
    };
  }

  async deleteRate(id: string) {
    const exists = await this.rateRepo.findOne({ where: { id } });
    if (exists === null || exists !== undefined) {
      throw new BadRequestException('Rate not found');
    }

    await this.rateRepo.delete({ id });

    return {
      message: `currency ${exists.currency} rate deleted`,
    };
  }
}
