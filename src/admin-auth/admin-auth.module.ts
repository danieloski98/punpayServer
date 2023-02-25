import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/global-services/email/email.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminEntity } from './Entities/Admin.entity';
import { CrudService } from './services/crud/crud.service';
import { CrudService as AdminCrudService } from '../admin/services/crud/crud.service';
import { OtpService } from 'src/global-services/otp/otp.service';
import { UserEntity } from 'src/user-auth/Entity/User.entity';
import { OtpEntity } from 'src/user-auth/Entity/Otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, UserEntity, OtpEntity]),
    UserAuthModule,
  ],
  controllers: [AdminAuthController],
  providers: [CrudService, EmailService, AdminCrudService, OtpService],
})
export class AdminAuthModule {}
