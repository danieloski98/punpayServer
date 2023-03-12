import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { CreateVerifcationDTO } from './dto/create-verification-dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async createVerification(userId: string, payload: CreateVerifcationDTO) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    // check if the user has a verification uploaded
    const verification = await this.verificationRepo.findOne({
      where: { userId },
    });
    if (verification !== null) {
      throw new BadRequestException(
        'You already have a verification in progress',
      );
    }
    // create verification entry
    const newEntry = this.verificationRepo.create({
      userId,
      identificationName: payload.identification_name,
      identificationDOB: payload.identification_dob,
      identificationNumber: payload.identification_number,
      identificationType: payload.identification_type,
    });

    await this.verificationRepo.save(newEntry);

    return {
      message: 'verification uploaded and is processing',
    };
  }
}
