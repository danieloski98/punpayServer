import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BanksService } from './services/banks/banks.service';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IBank } from '../types/banksModels';
import { CreateBankDTO } from './DTO/createBankDTO';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';
import { BankEntity } from './Entities/bank.entity';
import { AdminEntity } from 'src/admin-auth/Entities/admin.entity';

@ApiTags('BANKS')
@Controller('bank')
export class BankController {
  constructor(private bankService: BanksService) {}

  @ApiOkResponse({ type: IBank, isArray: true })
  @Get()
  getAllBanks() {
    return this.bankService.getBanks();
  }

  @ApiOkResponse({ type: BankEntity, isArray: true })
  @Get('admin')
  getAllAdminBanks() {
    return this.bankService.getAdminAccounts();
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

  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: CreateBankDTO })
  @ApiParam({ name: 'id' })
  @Put('admin/update/:id')
  updateadminaccount(@Body() body: CreateBankDTO, @Param('id') param: string) {
    return this.bankService.updatedAdminAccount(param, body);
  }

  @UseGuards(AdminAuthGuard)
  @ApiParam({ name: 'id' })
  @Delete('admin/:id')
  deleteAdminBank(@User() admin: AdminEntity, @Param('id') id: string) {
    return this.bankService.deleteAdminBank(id);
  }
}
