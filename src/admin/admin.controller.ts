import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { CrudService } from './services/crud/crud.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateAdminDto } from './DTO/update.dto';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';

@Controller('admin')
@ApiTags('ADMIN')
export class AdminController {
  constructor(private crudService: CrudService) {}

  @Put('update')
  @UseGuards(AdminAuthGuard)
  @ApiBody({ type: UpdateAdminDto })
  updateAccount(@Body() body: UpdateAdminDto) {
    return this.crudService.updateAdminDetails(body);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  getAllAdmins() {
    return this.crudService.getAllAdmins();
  }
}
