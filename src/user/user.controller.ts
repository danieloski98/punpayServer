import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ChangePasswordDTO } from './DTO/ChangePasswordDTO';
import { CreateNextOfKinDTO } from './DTO/CreateNextOfKinDTO';
import { BalanceService } from './services/balance/balance.service';
import { CrudService } from './services/crud/crud.service';
import { Next0fkinService } from './services/next0fkin/next0fkin.service';
import { WalletService } from './services/wallet/wallet.service';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';

export interface IUser {
  id: string;
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(
    private crudService: CrudService,
    private nextofkinService: Next0fkinService,
    private balanceService: BalanceService,
    private walletService: WalletService,
  ) {}

  @ApiTags('USER')
  @ApiParam({ name: 'id' })
  @Get('/profile/:id')
  getUserbyID(@Param() param: { id: string }) {
    return this.crudService.getUserByID(param.id);
  }

  @ApiTags('USER')
  @ApiParam({ name: 'user_id' })
  @Get('/wallets/:user_id')
  getWallets(@Param('user_id') param: any) {
    return this.walletService.getWallets(param);
  }

  @ApiTags('ADMIN:USER')
  @ApiParam({ name: 'id' })
  @UseGuards(AdminAuthGuard)
  @Get('')
  getUser() {
    return this.crudService.getAllUsers();
  }

  @UseGuards(AuthorizationGuard)
  @ApiTags('USER')
  @ApiBody({ type: ChangePasswordDTO })
  @Put('change-password')
  getChangePassword(@Body() body: ChangePasswordDTO) {
    return this.crudService.changePassword(body);
  }

  @ApiTags('USER')
  @UseGuards(new AuthorizationGuard())
  @Get('balance')
  getBalance(@User() User: IUser) {
    console.log('balance');
    return this.balanceService.getBalance(User.id);
  }

  @ApiTags('USER')
  @UseGuards(new AuthorizationGuard())
  @ApiParam({ name: 'currency' })
  @Get('wallet/:currency')
  getWallet(@User() User: IUser, @Param('currency') param: any) {
    console.log('balance');
    return this.walletService.getWalletById(User.id, param);
  }

  @UseGuards(AuthorizationGuard)
  @ApiTags('USER')
  @ApiBody({ type: CreateNextOfKinDTO })
  @Put('create-next-of-kin')
  createNextOfKin(@Body() body: CreateNextOfKinDTO, @Req() req: Request) {
    return this.nextofkinService.createNextOfKin(req['user'].id, body);
  }
}
