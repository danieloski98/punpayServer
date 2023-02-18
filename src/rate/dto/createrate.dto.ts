import { Exclude, Expose } from 'class-transformer';
import { RateCreateableInterface } from '../rate.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateRateDto implements RateCreateableInterface {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'can either be buy or sell',
  })
  type: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  currency: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
  })
  rate: number;
}
