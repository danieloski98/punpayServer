import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
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
    required: false,
    description:
      'can either be daily, monthly or yearly, if you dont pass a filter u must pass a date range',
  })
  @ApiQuery({
    name: 'status',
    type: String,
    required: true,
    description:
      '-1 = ALL, 0 = PEDNING, 1 = PROCESSING, 2 = CONFIRMED, 3 = PAID, 4 = FAILED, 5 = CANCELLED',
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    required: false,
    description:
      'if you want to search based on a date range then this is required',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    required: false,
    description: 'This is not required',
  })
  @Get('transactions')
  getTransactions(
    @Query()
    query: {
      filter: string;
      startDate: string;
      endDate: string;
      status: string;
    },
  ) {
    console.log(query);
    // if (query.filter === undefined && query.startDate === undefined) {
    //   throw new BadRequestException('You must either a filter or startDate');
    // }
    if (query.status === undefined) {
      throw new BadRequestException('You must pass a status');
    }
    return this.transactions.filterTransactions(
      parseInt(query.status),
      query.filter as any,
      query.startDate || null,
      query.endDate || null,
      // query.status,
    );
  }
}
