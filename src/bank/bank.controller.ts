import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { BanksService } from './services/banks/banks.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IBank } from '../types/banksModels';
import { CreateBankDTO } from './DTO/createBankDTO';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';

@ApiTags('BANKS')
@Controller('bank')
export class BankController {
  constructor(private bankService: BanksService) {}

  @ApiOkResponse({ type: IBank, isArray: true })
  @Get()
  getAllBanks() {
    return this.bankService.getBanks();
  }

  @ApiOkResponse({ type: IBank })
  @UseGuards(new AuthorizationGuard())
  @Get('user')
  getAllBank(@User() user: any) {
    return this.bankService.getBank(user.id);
  }

  @UseGuards(new AuthorizationGuard())
  @ApiBody({ type: CreateBankDTO })
  @Post('create')
  createbank(@Body() body: CreateBankDTO, @User() user: UserEntity) {
    return this.bankService.addBank(user.id, body);
  }

  // @UseGuards(new AdminAuthGuard())
  @ApiBody({ type: CreateBankDTO })
  @Post('admin/create')
  createbankAdmin(@Body() body: CreateBankDTO) {
    return this.bankService.addBankAdmin(body);
  }

  @ApiOkResponse({ type: IBank })
  @UseGuards(new AuthorizationGuard())
  @Put('unlink')
  unlink(@User() user: any) {
    return this.bankService.unlinkBank(user.id);
  }

  @ApiOkResponse({ type: IBank })
  @UseGuards(new AuthorizationGuard())
  @Put('link')
  link(@User() user: any) {
    return this.bankService.linkBank(user.id);
  }

  @UseGuards(new AuthorizationGuard())
  @ApiBody({ type: CreateBankDTO })
  @Put('update')
  updatebank(@Body() body: CreateBankDTO, @User() user: UserEntity) {
    return this.bankService.unpdateBank(user.id, body);
  }
}
