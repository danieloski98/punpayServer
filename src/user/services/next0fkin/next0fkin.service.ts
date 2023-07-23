import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { CreateNextOfKinDTO } from 'src/user/DTO/CreateNextOfKinDTO';
import { NextOfKinEntity } from 'src/user/Entities/nextofKin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Next0fkinService {
  private logger = new Logger('NextOfKinService');
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(NextOfKinEntity)
    private nextofkinRepo: Repository<NextOfKinEntity>,
  ) {}

  async createNextOfKin(id: string, payload: CreateNextOfKinDTO) {
    const hasNK = await this.nextofkinRepo.findOne({ where: { userId: id } });
    if (hasNK === null) {
      const nk = await this.nextofkinRepo
        .create({ ...payload, userId: id })
        .save();
      this.logger.debug(nk);
      return {
        message: 'Next of Kin Created!',
      };
    }
    return {
      message: 'You already have a next of Kin',
    };
  }

  async getNextOfKin(userId: string) {
    const data = await this.nextofkinRepo.findOne({ where: { userId } });

    return {
      data,
    };
  }
}
