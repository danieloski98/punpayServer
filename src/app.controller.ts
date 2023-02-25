import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './global-services/notification/notification.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private notificationService: NotificationService,
  ) {}

  @Get()
  getHello() {
    return this.notificationService.sendIndieNotification(
      '7c5884c0-c50d-489d-b339-171447eb9b48',
      'test',
      'This is a test service for just you',
    );
  }
}
