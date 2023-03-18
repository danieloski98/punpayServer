import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification-entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Notification_Url } from 'src/UTILS/urls';
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
      const res = await this.httpService.axiosRef.post(Notification_Url, {
        appId: process.env.NATIVE_NOTIFY_ID,
        appToken: process.env.NATIVE_NOTIFY_TOKEN,
        title,
        body,
        dateSent: new Date().toISOString(),
      });

      console.log(res.data);
      return {
        message: 'notification sent',
      };
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sendNotifiication(body: CreateNotification) {
    if (!body.isAdmin && !body.userId) {
      throw new BadRequestException('invalid option object');
    }
    const newObj = this.notiRepo.create(body);
    await this.notiRepo.save(newObj);

    if (!body.isAdmin) {
      await this.httpService.axiosRef.post(
        `https://app.nativenotify.com/api/indie/notification`,
        {
          subID: body.userId,
          appId: process.env.NATIVE_NOTIFY_ID,
          appToken: process.env.NATIVE_NOTIFY_TOKEN,
          title: body.title,
          message: body.body,
        },
      );
    }

    return {
      message: 'notification sent',
    };
  }

  async getUserNotifications(userId: string) {
    const notifications = await this.notiRepo.find({ where: { userId } });
    return {
      message: 'notifications',
      data: notifications,
    };
  }

  async getAdminNotifications() {
    const notifications = await this.notiRepo.find({
      where: { isAdmin: true },
    });
    return {
      message: 'notifications',
      data: notifications,
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
