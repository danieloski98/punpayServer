import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SellService } from './services/sell/sell.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { SellDTO } from './dto/sell.dto';
import { SendDTO } from './dto/send.dto';
import { SendService } from './services/send/send.service';
import { TransactionsService } from './services/transactions/transactions.service';
import { BuyService } from './services/buy/buy.service';
import { BuyDTO } from './dto/Buy.dto';
import { SwapService } from './services/swap/swap.service';
import { SwapDTO } from './dto/swap.dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user-auth/Entity/user.entity';

@ApiTags('TRANSACTIONS')
@Controller('transaction')
export class TransactionController {
  constructor(
    private sellService: SellService,
    private sendService: SendService,
    private transactionService: TransactionsService,
    private buyService: BuyService,
    private swapService: SwapService,
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

  @ApiParam({
    name: 'reference',
  })
  @Get('user/:reference')
  getUserTransactionbyReference(@Param('reference') param: string) {
    return this.transactionService.getTransactionsByReferenc(param);
  }

  @UseGuards(AuthorizationGuard)
  @ApiParam({
    name: 'reference',
  })
  @Get('user/coin/:currency')
  getUserTransactionbyCurrency(
    @Param('currency') param: string,
    @User() user: UserEntity,
  ) {
    return this.transactionService.getTransactionsForPaticularCoin(
      user.id,
      param,
    );
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

  @ApiBody({ type: BuyDTO })
  @Post('buy')
  async createBuyRequest(@Body() body: BuyDTO) {
    return await this.buyService.initiateBuy(body);
  }

  @ApiBody({ type: SendDTO })
  @Post('withdraw')
  async withdrawRequest(@Body() body: SendDTO) {
    console.log(body);
    return await this.sendService.sendCrypto(body);
  }

  @ApiBody({ type: SwapDTO })
  @Post('swap')
  async swapRequest(@Body() body: SwapDTO) {
    console.log(body);
    return await this.swapService.swapTransaction(body);
  }

  @ApiParam({ name: 'transactionId' })
  @Put(':transactionId')
  async moneySent(@Param('transactionId') param: string) {
    return await this.buyService.confirmBuy(param);
  }
}
