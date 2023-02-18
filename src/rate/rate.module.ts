import { Module } from '@nestjs/common';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from 'src/Entities/Rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
