import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './verification.entity';
import { UserEntity } from 'src/user-auth/Entity/user.entity';

@Module({
  controllers: [VerificationController],
  imports: [TypeOrmModule.forFeature([Verification, UserEntity])],
  providers: [VerificationService],
})
export class VerificationModule {}
