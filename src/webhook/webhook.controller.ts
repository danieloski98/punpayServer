import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WEBHOOK')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  handleWebhook(@Body() body: any) {
    return this.webhookService.handleWebHook(body);
  }
}
