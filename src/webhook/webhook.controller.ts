import { Body, Controller, Header, Post, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ApiTags } from '@nestjs/swagger';
import { MetamapService } from './metamap/metamap.service';
import { Request } from 'express';

@ApiTags('WEBHOOK')
@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly metaMapService: MetamapService,
  ) {}

  @Post()
  handleWebhook(@Body() body: any) {
    return this.webhookService.handleWebHook(body);
  }

  @Post('metamap')
  handleMetamapWebhook(@Body() body: any, @Req() req: Request) {
    console.log(req.headers);
    return this.metaMapService.getMeta();
  }
}
