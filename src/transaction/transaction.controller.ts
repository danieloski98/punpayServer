import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SellService } from './services/sell/sell.service';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
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
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';
import { ApproveTransactionDTO } from './dto/approveTransaction.DTO';
import { DeclineTransactionDTO } from './dto/DelcineTransactionDTO';

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

  @UseGuards(new AdminAuthGuard())
  @ApiParam({ name: 'currency' })
  @Get('admin/wallet/:currency')
  getAdminWalletAddress(@Param('currency') param: string) {
    return this.sellService.fetchAdminAddress(param);
  }
  // @UseGuards(new AdminAuthGuard())
  // @ApiParam({
  //   name: 'type',
  //   description: '0 = Deposit, 1=SELL, 2=BUY, 3=SWAP, 4=SEND',
  // })
  // @Get('admin/:type')
  // getTransactions(@Param('type') param: string) {
  //   return this.transactionService.getTransactions(+param);
  // }

  // @UseGuards(new AdminAuthGuard())
  @ApiQuery({
    name: 'status',
    type: String,
    required: false,
    description:
      '0 = PEDNING, 1 = PROCESSING, 2 = CONFIRMED, 3 = PAID, 4 = FAILED, 5 = CANCELLED',
  })
  @Get('admin-all')
  getAllTransactions(@Query('status') status: string) {
    console.log(typeof status);
    return this.transactionService.getAllTransactions(
      status === undefined ? undefined : parseInt(status),
    );
  }

  @UseGuards(new AdminAuthGuard())
  @ApiParam({
    name: 'transactionId',
  })
  @Get('admin/:transactionId')
  getTransactionbYId(@Param('transactionId') param: string) {
    return this.transactionService.getTransactionById(param);
  }

  @UseGuards(AuthorizationGuard)
  @ApiParam({
    name: 'userId',
  })
  @Get('user/all/:userId')
  getUserTransactions(@Param('userId') param: string) {
    return this.transactionService.getUserTransactions(param);
  }

  @UseGuards(AuthorizationGuard)
  @ApiParam({
    name: 'transactionId',
  })
  @Get('single/user/:transactionId')
  getUserTransactionbYId(@Param('transactionId') param: string) {
    return this.transactionService.getTransactionByUserId(param);
  }

  @UseGuards(AuthorizationGuard)
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
    @Query('type') type: string,
  ) {
    if (+type >= 0) {
      return this.transactionService.getTransactionsForPaticularCoin(
        user.id,
        param,
        +type,
      );
    }
    return this.transactionService.getTransactionsForPaticularCoin(
      user.id,
      param,
    );
  }

  @UseGuards(AuthorizationGuard)
  @ApiParam({ name: 'currency' })
  @ApiQuery({ name: 'quidax' })
  @Get('withdrawal-fee/:currency')
  getWithdrawalFees(
    @Param('currency') param: string,
    @Query('quidax') quidax: string,
  ) {
    return this.transactionService.getFees(
      param,
      quidax === 'true' ? true : false,
    );
  }

  //@UseGuards(new AdminAuthGuard())
  @Get('fees')
  getFees() {
    return this.sendService.getFees();
  }

  @UseGuards(AuthorizationGuard)
  @ApiBody({ type: SellDTO })
  @Post('sell')
  async createSellRequest(@Body() body: SellDTO) {
    return await this.sellService.sellCrypto(body);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBody({ type: BuyDTO })
  @Post('buy')
  async createBuyRequest(@Body() body: BuyDTO) {
    return await this.buyService.initiateBuy(body);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBody({ type: SendDTO })
  @Post('withdraw')
  async withdrawRequest(@Body() body: SendDTO) {
    console.log(body);
    return await this.sendService.sendCrypto(body);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBody({ type: SwapDTO })
  @Post('swap')
  async swapRequest(@Body() body: SwapDTO) {
    return await this.swapService.swapTransaction(body);
  }

  @ApiParam({ name: 'transactionId' })
  @Put(':transactionId')
  async moneySent(@Param('transactionId') param: string) {
    return await this.buyService.confirmBuy(param);
  }

  @UseGuards(new AdminAuthGuard())
  @ApiBody({ type: ApproveTransactionDTO })
  @Put('approve/transaction')
  async approveTransaction(@Body() body: ApproveTransactionDTO) {
    return await this.transactionService.approveTransaction(body.id, body.hash);
  }

  @UseGuards(new AdminAuthGuard())
  @ApiBody({
    type: DeclineTransactionDTO,
    description: 'The hash of the transaction is not needed in the case',
  })
  @Put('decline-transaction')
  async Payout(@Body() body: ApproveTransactionDTO) {
    return await this.transactionService.declienTransaction(body.id);
  }

  @UseGuards(new AdminAuthGuard())
  @ApiParam({
    name: 'transactionId',
    type: String,
  })
  @Delete('cancel-transaction/:transactionId')
  async cancel(@Param('transactionId') body: string) {
    return await this.transactionService.CancelTransaction(body);
  }
}
