import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { CreateVerifcationDTO } from './dto/create-verification-dto';
import { OnEvent } from '@nestjs/event-emitter';
import { MetaMapDTO } from '../webhook/metamap/metamap.dto';
import { EmailService } from 'src/global-services/email/email.service';
import { VERIFICATION_STATUS } from 'src/Enums/VerificationStatus';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private emailService: EmailService,
  ) {}

  async checkVerification(userId: string): Promise<boolean> {
    const doc = await this.verificationRepo.findOne({ where: { userId } });
    if (doc) {
      return true;
    } else {
      return false;
    }
  }

  async createVerification(payload: CreateVerifcationDTO) {
    const user = await this.userRepo.findOne({ where: { id: payload.userId } });
    if (user === null) {
      throw new BadRequestException('User not found');
    }
    // check if the user has a verification uploaded
    const verification = await this.verificationRepo.findOne({
      where: { userId: payload.userId },
    });
    if (verification !== null) {
      throw new BadRequestException(
        'You already have a verification in progress',
      );
    }
    // create verification entry
    const newEntry = this.verificationRepo.create({
      userId: payload.userId,
      link: payload.link,
      metadata: { ...payload.metadata },
    });

    await this.verificationRepo.save(newEntry);

    return {
      message: 'verification uploaded and is processing',
    };
  }

  async getAllVerificattion(filter = 'All') {
    if (filter === 'All') {
      const verification = await this.verificationRepo.find();
      return {
        message: 'All verifications',
        data: verification,
      };
    }
    const verification = await this.verificationRepo.find({
      where: { status: filter },
    });
    return {
      message: 'All verifications',
      data: verification,
    };
  }

  async getUserVerification(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const verificationEntry = await this.verificationRepo.findOne({
      where: { userId },
    });

    if (verificationEntry === null) {
      throw new BadRequestException('Verification not found');
    }

    return {
      message:
        verificationEntry === null
          ? 'No entry found'
          : 'verification entry found',
      data: verificationEntry,
    };
  }

  async approveDocument(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const verificationEntry = await this.verificationRepo.findOne({
      where: { userId },
    });

    if (verificationEntry === null) {
      throw new BadRequestException('Verification not found');
    }

    if (verificationEntry.status === VERIFICATION_STATUS.VERIFIED) {
      throw new BadRequestException('Document already approved');
    }

    await this.verificationRepo.update(
      { id: verificationEntry.id },
      { status: VERIFICATION_STATUS.VERIFIED },
    );

    // verrify user
    await this.userRepo.update({ id: userId }, { KYCVerified: true });

    // send an email to the user
    this.emailService.sendApprovedEmailEmail(
      user.email,
      `The account has been approved`,
    );

    return {
      message: 'Document approved',
      data: verificationEntry,
    };
  }

  async rejecttDocument(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const verificationEntry = await this.verificationRepo.findOne({
      where: { userId },
    });

    if (verificationEntry === null) {
      throw new BadRequestException('Verification not found');
    }

    if (verificationEntry.status === VERIFICATION_STATUS.REJECTED) {
      throw new BadRequestException('Document already rejected');
    }

    await this.verificationRepo.delete({ id: verificationEntry.id });

    // send an email to the user
    this.emailService.sendApprovedEmailEmail(
      user.email,
      `The document you uploaded has been rejected, please reupload you document`,
    );

    return {
      message: 'Document approved',
      data: verificationEntry,
    };
  }
}
