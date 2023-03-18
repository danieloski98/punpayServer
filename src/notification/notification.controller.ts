import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user-auth/Entity/user.entity';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AdminAuthGuard } from 'src/guards/admin-auth.guard';

@ApiTags('Notifications')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AuthorizationGuard)
  @Get('user')
  getUserNotification(@User() user: UserEntity) {
    return this.notificationService.getUserNotifications(user.id);
  }

  @UseGuards(AdminAuthGuard)
  @Get('admin')
  getAdminNotifications() {
    return this.notificationService.getAdminNotifications();
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  deleteNotifications(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
