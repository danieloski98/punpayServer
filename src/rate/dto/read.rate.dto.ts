import { Exclude, Expose } from 'class-transformer';
import { RateInterface } from '../rate.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReadRateDto implements RateInterface {
  @Expose()
  @ApiProperty({
    type: String,
  })
  id: string;

  @Expose()
  @ApiProperty({
    type: String,
  })
  createdAt: string;

  @Expose()
  @ApiProperty({
    type: String,
  })
  updatedAt: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
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
