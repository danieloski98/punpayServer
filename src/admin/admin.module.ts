import { Module } from '@nestjs/common';
import { CrudService } from './services/crud/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { AdminController } from './admin.controller';
import { EventsService } from './services/events/events.service';
import { EmailService } from 'src/global-services/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [CrudService, EventsService, EmailService],
  controllers: [AdminController],
})
export class AdminModule {}
