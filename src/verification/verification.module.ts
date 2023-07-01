import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { EmailService } from 'src/global-services/email/email.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [VerificationController],
  imports: [TypeOrmModule.forFeature([Verification, UserEntity]), HttpModule],
  providers: [VerificationService, EmailService],
  exports: [VerificationService],
})
export class VerificationModule {}
