import { Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';

@ApiTags('VERIFICATION')
@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  // @ApiBody({ type: CreateVerifcationDTO })
  // @Post('create')
  // @UseGuards(AuthorizationGuard)
  // createverification(
  //   @User() user: UserEntity,
  //   @Body() body: CreateVerifcationDTO,
  // ) {
  //   return this.verificationService.createVerification(body);
  // }

  @Get('Admin/all')
  @ApiQuery({
    name: 'status',
    description:
      'The status of the verification you are trying to get, PENDING,APPROVED,REJECTED. default is All',
  })
  @UseGuards(AuthorizationGuard)
  getAllverification(@Query('status') query: string) {
    return this.verificationService.getAllVerificattion(query);
  }

  @Get('')
  @UseGuards(AuthorizationGuard)
  getverification(@User() user: UserEntity) {
    return this.verificationService.getUserVerification(user.id);
  }

  @Put('approve/:userId')
  @ApiParam({ name: 'userId' })
  @UseGuards(AdminAuthGuard)
  apprroveverification(@Param('userId') userId: string) {
    return this.verificationService.approveDocument(userId);
  }

  @Delete('reject/:userId')
  @ApiParam({ name: 'userId' })
  @UseGuards(AdminAuthGuard)
  deleteveification(@Param('userId') userId: string) {
    return this.verificationService.rejecttDocument(userId);
  }
}
