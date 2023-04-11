import { Module } from '@nestjs/common';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/rate.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity]), HttpModule.register({})],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
