import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Notification_Url } from 'src/UTILS/urls';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class NotificationService {
  constructor(private httpService: HttpService) {}

  async sendGeneralNotification(title: string, body: string) {
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
  }

  async sendIndieNotification(userId: string, title: string, body: string) {
    await this.httpService.axiosRef.post(
      `https://app.nativenotify.com/api/indie/notification`,
      {
        subID: userId,
        appId: process.env.NATIVE_NOTIFY_ID,
        appToken: process.env.NATIVE_NOTIFY_TOKEN,
        title,
        message: body,
      },
    );
  }
}
