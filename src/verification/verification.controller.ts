import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UploadDto } from './dto/upload-dto';
import { RejectDTO } from './dto/rejectDTO';

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

  @Patch('reject/:userId')
  @ApiParam({ name: 'userId' })
  @ApiBody({ type: RejectDTO })
  @UseGuards(AdminAuthGuard)
  deleteveification(@Param('userId') userId: string, @Body() body: RejectDTO) {
    return this.verificationService.rejecttDocument(userId, body.reason);
  }

  @Post(':userId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'front', maxCount: 1 },
        { name: 'back', maxCount: 1 },
      ],
      { dest: './verification' },
    ),
  )
  uploadDocument(
    @Param('userId') id: string,
    @UploadedFiles()
    file: {
      front?: Express.Multer.File[];
      back?: Express.Multer.File[];
    },
    @Body() body: UploadDto,
  ) {
    return this.verificationService.uploadVerificationDoc(id, body, file);
  }
}
