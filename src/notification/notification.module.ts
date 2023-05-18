import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), HttpModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [TypeOrmModule, NotificationService],
})
export class NotificationModule {}
