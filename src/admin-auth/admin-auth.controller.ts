import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';
import { IUser } from 'src/user/user.controller';
import { AdminLoginDTO } from './DTO/AdminLoginDTO';
import { ChangePassword } from './DTO/ChangePasswordDTO';
import { CreateAccountDTO } from './DTO/CreateAccountDTO';
import { CrudService } from './services/crud/crud.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private crudService: CrudService) {}

  @ApiTags('ADMIN-AUTH')
  @ApiBody({ type: AdminLoginDTO })
  @Post('login')
  login(@Body() body: AdminLoginDTO) {
    return this.crudService.login(body);
  }

  @ApiTags('ADMIN-AUTH')
  @ApiBody({ type: CreateAccountDTO })
  @Post('create-account')
  createAccount(@Body() body: CreateAccountDTO) {
    return this.crudService.createAdmin(body);
  }

  @ApiTags('ADMIN-AUTH')
  @UseGuards(AdminAuthGuard)
  @Post('generate-OTP')
  generateOtp(@User() user: IUser) {
    return this.crudService.generateOTP(user.id);
  }

  @ApiTags('ADMIN-AUTH')
  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: ChangePassword })
  @Put('change-password')
  chnagePassword(@Body() body: ChangePassword) {
    return this.chnagePassword(body);
  }
}
