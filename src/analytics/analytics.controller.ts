import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './services/transactions/transactions.service';

@ApiTags('ANALYTICS')
@Controller('analytics')
export class AnalyticsController {
  constructor(
    private user: UserService,
    private transactions: TransactionsService,
  ) {}

  @Get('user-analytics')
  getUsers() {
    return this.user.getUserAnalytics();
  }

  // @ApiQuery({
  //   name: 'transactionType',
  //   type: Number,
  //   description: '1 = SELL, 2 = BUY, 3 = SWAP, 4 = SEND',
  // })
  // @ApiQuery({
  //   name: 'status',
  //   type: Number,
  //   description:
  //     '0 = Pending, 1 = Processing, 2 = Confirmed, 3 = PAID, 4 = FAILED',
  // })
  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'can either be daily, monthly or yearly',
  })
  @Get('transactions')
  getTransactions(
    @Query() query: { filter: string; transactionType: number; status: number },
  ) {
    return this.transactions.filterTransactions(
      query.filter as any,
      // query.transactionType,
      // query.status,
    );
  }
}
