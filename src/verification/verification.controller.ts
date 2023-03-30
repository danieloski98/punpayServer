import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateVerifcationDTO } from './dto/create-verification-dto';

@ApiTags('VERIFICATION')
@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @ApiBody({ type: CreateVerifcationDTO })
  @Post('create')
  @UseGuards(AuthorizationGuard)
  createverification(
    @User() user: UserEntity,
    @Body() body: CreateVerifcationDTO,
  ) {
    return this.verificationService.createVerification(user.id, body);
  }

  @Get('')
  @UseGuards(AuthorizationGuard)
  getverification(@User() user: UserEntity) {
    return this.verificationService.getUserVerification(user.id);
  }
}
