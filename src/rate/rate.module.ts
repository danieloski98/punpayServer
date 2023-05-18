import { Module } from '@nestjs/common';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/rate.entity';
import { HttpModule } from '@nestjs/axios';
import { SwapPercentageEntity } from './swappercentage.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RateEntity, SwapPercentageEntity]),
    HttpModule.register({}),
    NotificationModule,
  ],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
