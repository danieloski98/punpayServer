import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BuyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  bankId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  transaction_currency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  transaction_amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  payout_currency: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  payout_amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  rate: number;
}
