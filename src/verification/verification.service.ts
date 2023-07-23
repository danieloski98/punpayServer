import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { CreateVerifcationDTO } from './dto/create-verification-dto';
import { EmailService } from 'src/global-services/email/email.service';
import { VERIFICATION_STATUS } from 'src/Enums/VerificationStatus';
import { UploadDto } from './dto/upload-dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import Cloudinary from 'src/cloudinary';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private emailService: EmailService,
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async checkVerification(userId: string): Promise<boolean> {
    const doc = await this.verificationRepo.findOne({ where: { userId } });
    if (doc) {
      return true;
    } else {
      return false;
    }
  }

  async getAllVerificattion(filter = 'All') {
    if (filter === 'All') {
      const verification = await this.verificationRepo.find({
        relations: ['user'],
      });
      return {
        message: 'All verifications',
        data: verification,
      };
    }
    const verification = await this.verificationRepo.find({
      where: { status: filter },
      relations: ['user'],
    });
    return {
      message: 'All verifications',
      data: verification,
    };
  }

  async getUserVerification(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const verificationEntry = await this.verificationRepo.findOne({
      where: { userId },
      relations: ['user'],
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

  async rejecttDocument(userId: string, reason = '') {
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
      `The document you uploaded has been rejected, please reupload you document. the reason for the decline 
        REASON - ${reason}
      `,
    );

    return {
      message: 'Document approved',
      data: verificationEntry,
    };
  }

  async uploadVerificationDoc(
    userId: string,
    payload: UploadDto,
    file: {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    },
  ) {
    try {
      console.log(file.front);
      console.log(payload);
      const user = await this.userRepo.findOne({ where: { id: userId } });
      let back;

      if (user === null) {
        throw new BadRequestException('User not found');
      }

      const verificationEntry = await this.verificationRepo.findOne({
        where: {
          userId,
        },
      });

      if (verificationEntry !== null) {
        // verrification
        if (verificationEntry.status === VERIFICATION_STATUS.PENDING) {
          throw new BadRequestException(
            'Document already uploaded and awaiting approval',
          );
        }

        // upload front
        const front = await Cloudinary.uploader.upload(file.front[0].path);
        // if (file.back) {
        //   const url = await Cloudinary.uploader.upload(file.back[0].path);
        //   back = url.secure_url;
        // }

        const verification = this.verificationRepo.create({
          userId: userId,
          front: front.secure_url,
          back: back ?? '',
          doc_type: payload.doc_type,
        });

        await this.verificationRepo.save(verification);

        return {
          message: `Verification document uploaded`,
        };
      }

      // upload front
      const front = await Cloudinary.uploader.upload(file.front[0].path);
      // if (file.back) {
      //   const url = await Cloudinary.uploader.upload(file.back[0].path);
      //   back = url.secure_url;
      // }

      // create verification entry

      const verification = this.verificationRepo.create({
        userId: userId,
        front: front.secure_url,
        back: front.secure_url,
        doc_type: payload.doc_type,
      });

      await this.verificationRepo.save(verification);

      return {
        message: 'Verrification uploaded',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`An errorr occured`);
    }
  }
}
