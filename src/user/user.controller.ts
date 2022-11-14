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
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ChangePasswordDTO } from './DTO/ChangePasswordDTO';
import { CreateNextOfKinDTO } from './DTO/CreateNextOfKinDTO';
import { CrudService } from './services/crud/crud.service';
import { Next0fkinService } from './services/next0fkin/next0fkin.service';

@Controller('user')
export class UserController {
  constructor(
    private crudService: CrudService,
    private nextofkinService: Next0fkinService,
  ) {}

  @ApiTags('USER')
  @ApiParam({ name: 'id' })
  @Get(':id')
  getUserbyID(@Param() param: { id: string }) {
    return this.crudService.getUserByID(param.id);
  }

  @ApiTags('ADMIN:USER')
  @ApiParam({ name: 'id' })
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

  @UseGuards(AuthorizationGuard)
  @ApiTags('USER')
  @ApiBody({ type: CreateNextOfKinDTO })
  @Put('create-next-of-kin')
  createNextOfKin(@Body() body: CreateNextOfKinDTO, @Req() req: Request) {
    return this.nextofkinService.createNextOfKin(req['user'].id, body);
  }
}
