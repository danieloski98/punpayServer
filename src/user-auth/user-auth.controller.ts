import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateAccountDTO } from './DTO/CreateAccountDTO';
import { LoginDTO } from './DTO/LoginDTO';
import { PasswordResetDTO } from './DTO/PasswordReset';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from './Entity/User.entity';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Controller('user-auth')
@ApiTags('USER-AUTH')
export class UserAuthController {
  constructor(private userService: UserAuthService) {}

  @ApiBody({ type: CreateAccountDTO })
  @Post('create/account')
  createAccount(@Body() body: CreateAccountDTO) {
    console.log('user creation');
    return this.userService.createUser(body);
  }

  @ApiParam({ name: 'code' })
  @Post('verify-otp/:code')
  verifyOtp(@Param() param: { code: string }) {
    return this.userService.verifyCode(+param.code);
  }

  @ApiBody({ type: LoginDTO })
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }

  @ApiParam({ name: 'email' })
  @Get('resend-otp/:email')
  resendOtp(@Param() param: { email: string }) {
    return this.userService.resendVerificationCode(param.email);
  }

  @ApiParam({ name: 'email' })
  @Get('request-reset-otp/:email')
  requestResetCode(@Param() param: { email: string }) {
    return this.userService.passwordResetRequest(param.email);
  }

  @ApiParam({ name: 'code' })
  @Post('verify-reset-otp/:code')
  verifyResetCode(@Param() param: { code: string }) {
    return this.userService.verifyResetCode(+param.code);
  }

  @ApiBody({ type: PasswordResetDTO })
  @Post('reset-password')
  Resetpassword(@Body() body: PasswordResetDTO) {
    return this.userService.resetPassword(body);
  }

  @UseGuards(AuthorizationGuard)
  @Get('verify-token')
  verifyTOken(@User() user: UserEntity) {
    return this.userService.verifyToken(user);
  }
}
