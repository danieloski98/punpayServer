import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/global-services/email/email.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminEntity } from './Entities/Admin.Entity';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), UserAuthModule],
  controllers: [AdminAuthController],
  providers: [CrudService, EmailService],
})
export class AdminAuthModule {}
