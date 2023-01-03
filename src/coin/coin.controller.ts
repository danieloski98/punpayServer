import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CoinService } from './services/coin/coin.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@ApiTags('COINS')
@Controller('coin')
export class CoinController {
  constructor(private coinService: CoinService) {}

  @UseGuards(new AuthorizationGuard())
  @Get('coins')
  getCoins(@User() user: any) {
    return this.coinService.getCoins(user.id);
  }

  @UseGuards(new AuthorizationGuard())
  @ApiParam({ name: 'id' })
  @Get('coin/:id')
  getCoin(@Param() param: { id: string }) {
    return this.coinService.getCoinById(param.id);
  }
}
