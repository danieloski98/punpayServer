import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAccountDTO } from './DTO/CreateAccountDTO';
import { LoginDTO } from './DTO/LoginDTO';
import { PasswordResetDTO } from './DTO/PasswordReset';
import { UserAuthService } from './services/user-auth/user-auth.service';

@Controller('user-auth')
export class UserAuthController {
  constructor(private userService: UserAuthService) {}

  @ApiTags('USER-AUTH')
  @ApiBody({ type: CreateAccountDTO })
  @Post('create/account')
  createAccount(@Body() body: CreateAccountDTO) {
    console.log('user creation');
    return this.userService.createUser(body);
  }

  @ApiTags('USER-AUTH')
  @ApiParam({ name: 'code' })
  @Post('verify-otp/:code')
  verifyOtp(@Param() param: { code: string }) {
    return this.userService.verifyCode(+param.code);
  }

  @ApiTags('USER-AUTH')
  @ApiBody({ type: LoginDTO })
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }

  @ApiTags('USER-AUTH')
  @ApiParam({ name: 'email' })
  @Get('resend-otp/:email')
  resendOtp(@Param() param: { email: string }) {
    return this.userService.resendVerificationCode(param.email);
  }

  @ApiTags('USER-AUTH')
  @ApiParam({ name: 'email' })
  @Get('request-reset-otp/:email')
  requestResetCode(@Param() param: { email: string }) {
    return this.userService.passwordResetRequest(param.email);
  }

  @ApiTags('USER-AUTH')
  @ApiParam({ name: 'code' })
  @Post('verify-reset-otp/:code')
  verifyResetCode(@Param() param: { code: string }) {
    return this.userService.verifyResetCode(+param.code);
  }

  @ApiTags('USER-AUTH')
  @ApiBody({ type: PasswordResetDTO })
  @Post('reset-password')
  Resetpassword(@Body() body: PasswordResetDTO) {
    return this.userService.resetPassword(body);
  }
}
