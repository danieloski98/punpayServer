import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SellService } from './services/sell/sell.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SellDTO } from './dto/sell.dto';
import { SendDTO } from './dto/send.dto';
import { SendService } from './services/send/send.service';
import { TransactionsService } from './services/transactions/transactions.service';

@ApiTags('TRANSACTIONS')
@Controller('transaction')
export class TransactionController {
  constructor(
    private sellService: SellService,
    private sendService: SendService,
    private transactionService: TransactionsService,
  ) {}

  @ApiParam({ name: 'currency' })
  @Get('admin/wallet/:currency')
  getAdminWalletAddress(@Param('currency') param: string) {
    return this.sellService.fetchAdminAddress(param);
  }

  @ApiParam({
    name: 'type',
    description: '0 = Deposit, 1=SELL, 2=BUY, 3=SWAP, 4=SEND',
  })
  @Get('admin/:type')
  getTransactions(@Param('type') param: string) {
    return this.transactionService.getTransactions(+param);
  }

  @ApiParam({
    name: 'transactionId',
  })
  @Get('admin/:transactionId')
  getTransactionbYId(@Param('transactionId') param: string) {
    return this.transactionService.getTransactionById(param);
  }

  @ApiParam({
    name: 'transactionId',
  })
  @Get('user/:transactionId')
  getUserTransactionbYId(@Param('transactionId') param: string) {
    return this.transactionService.getTransactionById(param);
  }

  @ApiParam({ name: 'currency' })
  @Get('withdrawal-fee/:currency')
  getWithdrawalFees(@Param('currency') param: string) {
    return this.transactionService.getFees(param);
  }

  @ApiBody({ type: SellDTO })
  @Post('sell')
  async createSellRequest(@Body() body: SellDTO) {
    return await this.sellService.sellCrypto(body);
  }

  @ApiBody({ type: SendDTO })
  @Post('withdraw')
  async withdrawRequest(@Body() body: SendDTO) {
    console.log(body);
    return await this.sendService.sendCrypto(body);
  }
}
