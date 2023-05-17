import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/global-services/email/email.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminEntity } from './Entities/admin.entity';
import { CrudService } from './services/crud/crud.service';
import { CrudService as AdminCrudService } from '../admin/services/crud/crud.service';
import { OtpService } from 'src/global-services/otp/otp.service';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { OtpEntity } from 'src/user-auth/Entity/otp.entity';
import { AdminTypeEntity } from './Entities/AdminType.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      UserEntity,
      OtpEntity,
      AdminTypeEntity,
    ]),
    UserAuthModule,
  ],
  controllers: [AdminAuthController],
  providers: [CrudService, EmailService, AdminCrudService, OtpService],
})
export class AdminAuthModule {}
