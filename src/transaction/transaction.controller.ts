import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SellService } from './services/sell/sell.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SellDTO } from './dto/sell.dto';

@ApiTags('TRANSACTIONS')
@Controller('transaction')
export class TransactionController {
  constructor(private sellService: SellService) {}

  @ApiParam({ name: 'currency' })
  @Get('admin/wallet/:currency')
  getAdminWalletAddress(@Param('currency') param: string) {
    return this.sellService.fetchAdminAddress(param);
  }

  @ApiBody({ type: SellDTO })
  @Post('sell')
  async createSellRequest(@Body() body: SellDTO) {
    return await this.sellService.sellCrypto(body);
  }
}
