import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Notification_Url } from 'src/UTILS/urls';
import { union } from 'lodash';
interface CreateNotification {
  isAdmin: boolean;
  userId?: string;
  body: string;
  title: string;
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notiRepo: Repository<NotificationEntity>,
    private httpService: HttpService,
  ) {}

  async sendGeneralNotification(title: string, body: string) {
    try {
      const Notification = this.notiRepo.create({
        isGeneral: true,
        title,
        body,
      });

      await this.notiRepo.save(Notification);

      return {
        message: 'notification sent',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sendUserNotification(userId: string, title: string, body: string) {
    try {
      const Notification = this.notiRepo.create({
        isAdmin: false,
        isGeneral: false,
        userId,
        title,
        body,
      });

      await this.notiRepo.save(Notification);

      return {
        message: 'notification sent',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sendAdminNotification(
    title: string,
    body: string,
    adminType: string = null,
  ) {
    try {
      if (adminType === null) {
        const Notification = this.notiRepo.create({
          isAdmin: true,
          isGeneral: true,
          adminType: '',
          title,
          body,
        });

        await this.notiRepo.save(Notification);

        return {
          message: 'notification sent',
        };
      }
      const Notification = this.notiRepo.create({
        isAdmin: true,
        isGeneral: false,
        adminType,
        title,
        body,
      });

      await this.notiRepo.save(Notification);

      return {
        message: 'notification sent',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getUserNotifications(userId: string) {
    const notifications = await this.notiRepo.find({
      where: [{ userId }, { isGeneral: true, isAdmin: false }],
    });
    return {
      message: 'notifications',
      data: union([notifications]),
    };
  }

  async getAdminNotifications(adminType: string = null) {
    if (adminType === null) {
      const notifications = await this.notiRepo.find({
        where: [{ isGeneral: true }, { isAdmin: true }],
      });
      return {
        message: 'notifications',
        data: notifications,
      };
    }
    const notifications = await this.notiRepo.find({
      where: [
        { adminType, isAdmin: true },
        { isGeneral: true, isAdmin: true },
      ],
    });
    return {
      message: 'notifications',
      data: union([notifications]),
    };
  }

  async deleteNotification(id: string) {
    const notification = await this.notiRepo.findOne({ where: { id } });
    if (notification) {
      throw new BadRequestException('Notification not found');
    }

    await this.notiRepo.delete({ id });
    return {
      message: 'notification deleted',
    };
  }
}
