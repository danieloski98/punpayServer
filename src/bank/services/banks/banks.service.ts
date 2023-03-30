import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBankDTO } from 'src/bank/DTO/createBankDTO';
import { BankEntity } from 'src/bank/Entities/bank.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { Repository } from 'typeorm';
import { AxiosError } from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class BanksService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(BankEntity) private bankRepo: Repository<BankEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async getBanks() {
    try {
      const data = await this.httpService.axiosRef.get(
        'https://api.paystack.co/bank',
        { headers: { Authorization: `Bearer ${process.env.PSSK}` } },
      );
      return {
        message: 'List of banks',
        data: data.data.data,
      };
    } catch (error: any) {
      const err: AxiosError<any, any> = error;
      throw new BadRequestException(
        err.response.data,
        'An error occured while getting the banks',
      );
    }
  }

  async getBank(userId: string) {
    const bank = await this.bankRepo.findOne({ where: { userId } });
    if (bank === null) {
      throw new BadRequestException('Bank not found');
    }
    if (bank && !bank.isLinked) {
      return {
        message: 'Bank Not linked',
      };
    }
    return {
      message: 'Bank found',
      data: bank,
    };
  }

  async unlinkBank(userId: string) {
    const bank = await this.bankRepo.findOne({ where: { userId } });
    if (bank === null) {
      throw new BadRequestException('Bank not found');
    }
    if (bank && bank.isLinked) {
      await this.bankRepo.update({ id: bank.id }, { isLinked: false });
      return {
        message: 'Account unlinked',
      };
    }
    if (bank && !bank.isLinked) {
      return {
        message: 'Account already unlinked',
      };
    }
  }

  async linkBank(userId: string) {
    const bank = await this.bankRepo.findOne({ where: { userId } });
    if (bank === null) {
      throw new BadRequestException('Bank not found');
    }
    if (bank && !bank.isLinked) {
      await this.bankRepo.update({ id: bank.id }, { isLinked: true });
      return {
        message: 'Account linked',
      };
    }
    if (bank && bank.isLinked) {
      return {
        message: 'Account already linked',
      };
    }
  }

  async unpdateBank(userId: string, bank: CreateBankDTO) {
    try {
      const hasBank = await this.bankRepo.findOne({ where: { userId } });
      if (hasBank === null) {
        throw new BadRequestException("You don't have a bank");
      }

      // reslove ths account
      const { data } = await this.httpService.axiosRef.get(
        `https://api.paystack.co/bank/resolve?account_number=${bank.accountNumber}&bank_code=${bank.code}`,
        { headers: { Authorization: `Bearer ${process.env.PSSK}` } },
      );

      await this.bankRepo.update(
        { id: hasBank.id },
        {
          bankId: bank.id,
          name: bank.bankname,
          code: bank.code,
          accountName: data.data.account_name,
          accountNumber: data.data.account_number,
          userId,
        },
      );
      const bankk = await this.bankRepo.findOne({ where: { userId } });
      return {
        message: 'Account updated and linked',
        data: bankk,
      };
    } catch (error) {
      const err: AxiosError<any, any> = error;
      throw new BadRequestException(
        err.response.data || err.message,
        'An error occured while verifying account number',
      );
    }
  }

  async addBank(userId: string, payload: CreateBankDTO) {
    try {
      console.log(payload);
      const hasBank = await this.bankRepo.findOne({ where: { userId } });
      if (hasBank !== null) {
        throw new BadRequestException(
          'You already have a bank, either update or link the bank',
        );
      }

      // reslove ths account
      const { data } = await this.httpService.axiosRef.get(
        `https://api.paystack.co/bank/resolve?account_number=${payload.accountNumber}&bank_code=${payload.code}`,
        { headers: { Authorization: `Bearer ${process.env.PSSK}` } },
      );
      console.log(data);
      // create new Bank
      const newBank = await this.bankRepo
        .create({
          bankId: payload.id,
          name: payload.bankname,
          code: payload.code,
          accountName: data.data.account_name,
          accountNumber: data.data.account_number,
          userId,
          isLinked: true,
          isAdminAccount: false,
        })
        .save();

      return {
        message: 'Account created and linked',
        data: newBank,
      };
    } catch (error) {
      const err: AxiosError<any, any> = error;
      throw new BadRequestException(
        err.response.data || err.message,
        'An error occured while verifying account number',
      );
    }
  }

  async addBankAdmin(payload: CreateBankDTO) {
    try {
      // reslove ths account
      const { data } = await this.httpService.axiosRef.get(
        `https://api.paystack.co/bank/resolve?account_number=${payload.accountNumber}&bank_code=${payload.code}`,
        { headers: { Authorization: `Bearer ${process.env.PSSK}` } },
      );
      // create new Bank
      const bankExist = await this.bankRepo.findOne({
        where: {
          isAdminAccount: true,
          accountNumber: data.data.account_number,
        },
      });
      if (bankExist !== null) {
        throw new BadRequestException('Bank already exist');
      }
      console.log(data.data);
      const newBank = await this.bankRepo
        .create({
          bankId: payload.id,
          name: payload.bankname,
          code: payload.code,
          accountName: data.data.account_name,
          accountNumber: data.data.account_number,
          isLinked: true,
          isAdminAccount: true,
        })
        .save();

      return {
        message: 'Account created and linked',
        data: newBank,
      };
    } catch (error) {
      const err: AxiosError<any, any> = error;
      throw new BadRequestException(
        err.response.data || err.message,
        'An error occured while verifying account number',
      );
    }
  }

  async getAdminAccounts() {
    const banks = await this.bankRepo.find({ where: { isAdminAccount: true } });
    return {
      data: banks,
    };
  }

  async updatedAdminAccount(bankId: string, payload: CreateBankDTO) {
    // reslove ths account
    const { data } = await this.httpService.axiosRef.get(
      `https://api.paystack.co/bank/resolve?account_number=${payload.accountNumber}&bank_code=${payload.code}`,
      { headers: { Authorization: `Bearer ${process.env.PSSK}` } },
    );
    // create new Bank
    const bankExist = await this.bankRepo.findOne({
      where: {
        isAdminAccount: true,
        id: bankId,
      },
    });
    if (bankExist === null) {
      throw new BadRequestException("Bank deosn't exist");
    }
    // update the bank
    await this.bankRepo.update(
      { id: bankId },
      {
        bankId: payload.id,
        name: payload.bankname,
        code: payload.code,
        accountName: data.data.account_name,
        accountNumber: data.data.account_number,
      },
    );
    return {
      message: 'Bank Updated',
    };
  }

  async deleteAdminBank(id: string) {
    const bank = await this.bankRepo.findOne({ where: { id } });
    if (bank === null) {
      throw new BadRequestException('Bank not found');
    }
    await this.bankRepo.delete({ id });
    return {
      message: 'Bank Deleted',
    };
  }
}
