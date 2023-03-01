import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RateService } from './rate.service';
import { ReadRateDto } from '../dto/read.rate.dto';
import { UpdateRateDto } from '../dto/update.rate';
import { CreateRateDto } from '../dto/createrate.dto';

@ApiTags('RATE')
@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get('supported-currencies')
  @ApiOkResponse({ type: String, isArray: true })
  getSupportedCurrencies() {
    return this.rateService.getSupportedCurrencies();
  }

  @Get('')
  @ApiOkResponse({ type: ReadRateDto, isArray: true })
  getRates() {
    return this.rateService.getRates();
  }

  @Get(':currency/:type')
  @ApiParam({ name: 'currency' })
  @ApiParam({ name: 'type', description: 'it can either be buy or sell' })
  @ApiOkResponse({ type: ReadRateDto })
  getRate(@Param('currency') param: any, @Param('type') type: any) {
    return this.rateService.getRate(param, type);
  }

  @Post('create')
  @ApiBody({ type: CreateRateDto })
  @ApiOkResponse({ type: CreateRateDto })
  createRate(@Body() body: CreateRateDto) {
    return this.rateService.createRate(body);
  }

  @Put(':id/:rate')
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'rate' })
  @ApiOkResponse({ type: UpdateRateDto })
  updateCoin(@Param('id') param: any, @Param('rate') rate: any) {
    return this.rateService.updateRate(param, +rate);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteeCoin(@Param('id') param: any) {
    return this.rateService.deleteRate(param);
  }
}
