import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NotificationService } from './global-services/notification/notification.service';
import { quidax } from './UTILS/quidax';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private notificationService: NotificationService,
  ) {}

  @Get()
  async getHello() {
    const res = await quidax.wallets.fetchCurrencyWallet('bc5m64wl', 'btc');
    return res;
  }
}
