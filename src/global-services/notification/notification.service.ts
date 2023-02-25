import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Notification_Url } from 'src/UTILS/urls';

@Injectable()
export class NotificationService {
  constructor(private httpService: HttpService) {}

  async sendGeneralNotification(title: string, body: string) {
    const res = await this.httpService.axiosRef.post(Notification_Url, {
      appId: 6405,
      appToken: 'JhIbh6BDeO8Z5mEBHU50Dh',
      title,
      body,
      dateSent: new Date().toISOString(),
    });

    console.log(res.data);
    return {
      message: 'notification sent',
    };
  }

  async sendIndieNotification(userId: string, title: string, body: string) {
    await this.httpService.axiosRef.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: userId,
        appId: 6405,
        appToken: 'JhIbh6BDeO8Z5mEBHU50Dh',
        title,
        message: body,
      },
    );
  }
}
